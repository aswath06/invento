import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Modal,
  Alert,
  Platform,
} from "react-native";
import { ArrowLeft, Search, Calendar } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useProductStore } from "../../store/products";
import { useCustomerStore } from "../../store/customer";
import styles from "./StockoutStyles";
import axios from "axios";
import { BASE_URL } from "../../store/config";

export const SelectModalDropdown = ({
  label,
  data,
  selectedItem,
  onSelect,
  placeholder,
  loading,
  valueKey,
  labelKey,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) =>
    (item[labelKey] || "")
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedItem
            ? selectedItem[labelKey]
            : placeholder || `Choose ${label.toLowerCase()}`}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
            </View>

            <View style={styles.searchContainer}>
              <Search color="#555" size={18} />
              <TextInput
                style={styles.searchInput}
                placeholder={`Search ${label.toLowerCase()}...`}
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#D32F2F"
                style={{ marginTop: 20 }}
              />
            ) : (
              <FlatList
                data={filteredData}
                keyExtractor={(item, index) =>
                  (item[valueKey]?.toString()) || index.toString()
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.productRow}
                    onPress={() => {
                      onSelect(item);
                      setModalVisible(false);
                    }}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        selectedItem?.[valueKey] === item[valueKey] &&
                          styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.productText}>{item[labelKey]}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const Stockout = () => {
  const navigation = useNavigation();
  const { products, fetchProducts, loading: productLoading, error: productError } = useProductStore();
  const { customers, fetchCustomers, loading: customerLoading, error: customerError } = useCustomerStore();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (productError) Alert.alert("Error", productError);
    if (customerError) Alert.alert("Error", customerError);
  }, [productError, customerError]);

  const totalAmount = (parseFloat(quantity) || 0) * (parseFloat(price) || 0);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setSelectedCustomer(null);
    setQuantity("");
    setPrice("");
    setDate(new Date());
  };

  const handleConfirm = async () => {
    if (!selectedProduct || !selectedCustomer || !quantity || !price) {
      Alert.alert("Missing Data", "Please fill all fields before confirming.");
      return;
    }

    const payload = {
      productQrcode: selectedProduct.qrcode,
      customerId: selectedCustomer.id,
      qty: parseFloat(quantity),
      price: parseFloat(price),
      date: date.toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(`${BASE_URL}/qtydetails`, payload);
      console.log("Server Response:", response.data);
      Alert.alert("Success", "Stock-Out recorded successfully!");
      handleCancel();
    } catch (error) {
      console.error("Error posting stock-out:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to save stock-out"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Stock Out</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <SelectModalDropdown
          label="Select Product"
          data={products}
          selectedItem={selectedProduct}
          onSelect={setSelectedProduct}
          placeholder="Choose a product"
          loading={productLoading}
          valueKey="qrcode"
          labelKey="productName"
        />

        <SelectModalDropdown
          label="Select Customer"
          data={customers}
          selectedItem={selectedCustomer}
          onSelect={setSelectedCustomer}
          placeholder="Choose a customer"
          loading={customerLoading}
          valueKey="id"
          labelKey="customerName"
        />

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Price per Unit</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Total Amount</Text>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>₹ {totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowPicker(true)}
          >
            <Calendar color="#D32F2F" size={18} />
            <Text style={styles.dateText}>
              {date.toLocaleDateString("en-GB")}
            </Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#D32F2F", flex: 1, marginRight: 10 }]}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#777", flex: 1 }]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

