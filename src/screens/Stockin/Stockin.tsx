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
} from "react-native";
import { ArrowLeft, Search, Calendar } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useProductStore } from "../../store/products";
import { useVendorStore } from "../../store/vendor";
import styles from "./Stockin.styles";
import { BASE_URL } from "../..//store/config";

const SelectModalDropdown = ({
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
    item[labelKey]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
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
                color="#2E7D32"
                style={{ marginTop: 20 }}
              />
            ) : (
              <FlatList
                data={filteredData}
                keyExtractor={(item, index) =>
                  item[valueKey]?.toString() || index.toString()
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

export const Stockin = () => {
  const navigation = useNavigation();
  const { products, fetchProducts, loading: productLoading, error: productError } = useProductStore();
  const { vendors, fetchVendors, loading: vendorLoading, error: vendorError } = useVendorStore();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  const totalAmount = (parseFloat(quantity) || 0) * (parseFloat(price) || 0);

  useEffect(() => {
    fetchProducts();
    fetchVendors();
  }, []);

  useEffect(() => {
    if (productError) Alert.alert("Error", productError);
    if (vendorError) Alert.alert("Error", vendorError);
  }, [productError, vendorError]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setSelectedVendor(null);
    setQuantity("");
    setPrice("");
    setDate(new Date());
    setSubmittedId(null);
  };

  const handleConfirm = async () => {
  if (!selectedProduct || !selectedVendor || !quantity || !price) {
    Alert.alert("Missing Data", "Please fill all required fields before confirming.");
    return;
  }

  const payload = {
    productQrcode: selectedProduct.qrcode,
    date: date.toISOString().split("T")[0],
    qty: parseFloat(quantity),
    price: parseFloat(price),
    vendorId: selectedVendor.id,
  };

  try {
    setLoadingSubmit(true);
   await axios.post(`${BASE_URL}/qtydetails`, payload);

    Alert.alert("Success", "Stock-In completed successfully!");

    handleCancel(); 

  } catch (error) {
    Alert.alert("Error", "Failed to submit stock-in data");
    console.error(error);
  } finally {
    setLoadingSubmit(false);
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Stock In</Text>
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
          label="Select Vendor"
          data={vendors}
          selectedItem={selectedVendor}
          onSelect={setSelectedVendor}
          placeholder="Choose a vendor"
          loading={vendorLoading}
          valueKey="id"
          labelKey="vendorName"
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
            <Calendar color="#2E7D32" size={18} />
            <Text style={styles.dateText}>{date.toLocaleDateString("en-GB")}</Text>
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

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2E7D32" }]}
            onPress={handleConfirm}
            disabled={loadingSubmit}
          >
            <Text style={styles.buttonText}>
              {loadingSubmit ? "Submitting..." : "Confirm"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#D32F2F" }]}
            onPress={handleCancel}
            disabled={loadingSubmit}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
