import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Calendar, QrCode, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomInputBox } from "../components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { moderateScale } from "../utils/scalingUtils";

export const AppProduct = () => {
  const navigation = useNavigation();

  const [qrPermission, setQrPermission] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [qrCode, setQrCode] = useState("");
  const [productName, setProductName] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [basePrice, setBasePrice] = useState("0");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const productData = {
      qrCode,
      productName,
      initialStock,
      costPrice,
      date: date.toDateString(),
      basePrice,
      notes,
    };

    console.log("✅ Product Saved Successfully!");
    console.log("📦 Product Details:", JSON.stringify(productData, null, 2));
  };

  const handleSaveAndCreateAgain = () => {
    console.log("🔁 Product saved and resetting form...");
    setQrCode("");
    setProductName("");
    setInitialStock("");
    setCostPrice("");
    setDate(new Date());
    setBasePrice("0");
    setNotes("");
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleScanPress = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setQrPermission(status === "granted");
    if (status === "granted") {
      setShowScanner(true);
    } else {
      alert("Camera permission is required to scan QR codes");
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setShowScanner(false);
    setQrCode(data);
  };

  if (showScanner) {
    return (
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ flex: 1 }}
        />
        <TouchableOpacity
          onPress={() => setShowScanner(false)}
          style={styles.closeScannerButton}
        >
          <Text style={styles.closeScannerText}>Close Scanner</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={moderateScale(24)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.heading}>Add Product</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
        >
          <View style={styles.formContainer}>
            <CustomInputBox
              label="QR Code"
              value={qrCode}
              onChangeText={setQrCode}
              placeholder="Scan or enter code"
              required
              endIcon={<QrCode size={moderateScale(20)} color="#555" />}
              onIconPress={handleScanPress}
            />

            <CustomInputBox
              label="Product Name"
              value={productName}
              onChangeText={setProductName}
              placeholder="Enter product name"
              required
            />

            <CustomInputBox
              label="Initial Stock"
              value={initialStock}
              onChangeText={setInitialStock}
              placeholder="Enter initial stock quantity"
            />

            <CustomInputBox
              label="Cost Price"
              value={costPrice}
              onChangeText={setCostPrice}
              placeholder="Enter cost price"
            />

            <CustomInputBox
              label="Date"
              value={date.toDateString()}
              onChangeText={() => {}}
              placeholder="Select a date"
              endIcon={<Calendar size={moderateScale(20)} color="#555" />}
              onIconPress={() => setShowDatePicker(true)}
            />

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.sectionTitle}>Selling Price</Text>
            <CustomInputBox
              label="Base Price"
              value={basePrice}
              onChangeText={setBasePrice}
              placeholder="Enter base price"
            />
          </View>

          <View style={styles.notesContainer}>
            <Text style={styles.sectionTitle}>Add Notes</Text>
            <CustomInputBox
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter any additional details..."
              numberOfLines={4}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveAgainButton]}
              onPress={handleSaveAndCreateAgain}
            >
              <Text style={styles.buttonText}>Save & Create Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: moderateScale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(20),
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: "#000",
    marginLeft: moderateScale(10),
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: moderateScale(20),
  },
  priceContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: moderateScale(20),
  },
  notesContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: "#000",
    marginBottom: moderateScale(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  button: {
    flex: 1,
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    alignItems: "center",
    marginHorizontal: moderateScale(5),
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  saveAgainButton: {
    backgroundColor: "#F97316",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: moderateScale(16),
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeScannerButton: {
    position: "absolute",
    bottom: moderateScale(40),
    alignSelf: "center",
    backgroundColor: "#000",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  closeScannerText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
});
