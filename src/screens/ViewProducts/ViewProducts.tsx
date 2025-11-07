import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useProductStore } from "../../store/products";
import { moderateScale } from "../../utils/scalingUtils";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const placeholderImage =
  "https://imgs.search.brave.com/sviC8oI6o6W3cTK_5-moS5uHA4PSxowJUnKptfSPHEg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/OTk0LzcyNS9zbWFs/bC9uby1waG90b2dy/YXBoeS1pY29uLW5v/LXBpY3R1cmVzLXRp/bnktcGVvcGxlLWFu/ZC1yZWQtc2lnbi1u/by1jYW1lcmEtbW9k/ZXJuLWZsYXQtY2Fy/dG9vbi1zdHlsZS1p/bGx1c3RyYXRpb24t/b24td2hpdGUtYmFj/a2dyb3VuZC12ZWN0/b3IuanBn";

export const ViewProducts = () => {
  const navigation = useNavigation();
  const { products, fetchProducts, loading, error } = useProductStore();
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleExpand = (qrcode) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedProduct(expandedProduct === qrcode ? null : qrcode);
  };

  const renderQtyDetails = (qtyDetails) => (
    <View style={styles.qtyContainer}>
      <View style={styles.qtyHeaderRow}>
        <Text style={[styles.qtyHeader, { flex: 2 }]}>Date</Text>
        <Text style={[styles.qtyHeader, { flex: 1 }]}>Qty</Text>
        <Text style={[styles.qtyHeader, { flex: 1 }]}>Price</Text>
        <Text style={[styles.qtyHeader, { flex: 1 }]}>Type</Text>
      </View>
      {qtyDetails.map((item) => {
        const type = item.vendorId === null ? "Out" : "In";
        const typeColor = type === "In" ? "green" : "red";

        return (
          <View key={item.id} style={styles.qtyRow}>
            <Text style={[styles.qtyText, { flex: 2 }]}>{item.date}</Text>
            <Text style={[styles.qtyText, { flex: 1 }]}>{item.qty}</Text>
            <Text style={[styles.qtyText, { flex: 1 }]}>₹{item.price}</Text>
            <Text
              style={[
                styles.qtyText,
                { flex: 1, color: typeColor, fontWeight: "bold" },
              ]}
            >
              {type}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleExpand(item.qrcode)}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: placeholderImage }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.totalQty}>Total Qty: {item.totalQuantity}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {expandedProduct === item.qrcode && renderQtyDetails(item.qtyDetails)}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#D32F2F" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color="#fff" size={moderateScale(24)} />
        </TouchableOpacity>
        <Text style={styles.title}>View Product</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.qrcode}
        renderItem={renderProduct}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  appBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(12),
  },
  backButton: { marginRight: moderateScale(12) },
  title: { color: "#fff", fontSize: moderateScale(18), fontWeight: "bold" },

  content: { padding: moderateScale(16) },

  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(12),
    padding: moderateScale(12),
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  productImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(12),
  },
  productInfo: { flex: 1 },
  productName: { fontSize: moderateScale(16), fontWeight: "bold", color: "#000" },
  totalQty: { fontSize: moderateScale(14), color: "#000", marginTop: moderateScale(4) },

  qtyContainer: { marginTop: moderateScale(12), borderTopWidth: 1, borderColor: "#eee", paddingTop: moderateScale(8) },
  qtyHeaderRow: { flexDirection: "row", marginBottom: moderateScale(6) },
  qtyHeader: { fontWeight: "bold", fontSize: moderateScale(14), color: "#000" },
  qtyRow: { flexDirection: "row", marginBottom: moderateScale(6) },
  qtyText: { fontSize: moderateScale(14), color: "#000" },

  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: moderateScale(16) },
});
