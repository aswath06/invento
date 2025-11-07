import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  Modal 
} from 'react-native';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react-native';
import axios from 'axios';
import { useProductStore } from '../../store/products'; 
import { BASE_URL } from '../../store/config';

export const UpdateProducts = ({ navigation }) => {
  const { products, fetchProducts } = useProductStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = async () => {
    if (!currentProduct) return;
    try {
      await axios.put(`${BASE_URL}/products/${currentProduct.qrcode}`, {
        productName: newName || currentProduct.productName,
        totalQuantity: newQuantity || currentProduct.totalQuantity
      });
      Alert.alert('Success', 'Product updated successfully');
      setModalVisible(false);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  const handleDelete = async (qrcode) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/products/${qrcode}`);
              Alert.alert('Deleted', 'Product deleted successfully');
              fetchProducts();
            } catch (err) {
              console.error('Error deleting product:', err);
              Alert.alert('Error', 'Failed to delete product');
            }
          } 
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.productName}</Text>
        <Text style={styles.quantity}>Quantity: {item.totalQuantity}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => {
            setCurrentProduct(item);
            setNewName(item.productName);
            setNewQuantity(String(item.totalQuantity));
            setModalVisible(true);
          }}
        >
          <Edit2 />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => handleDelete(item.qrcode)}
        >
          <Trash2 color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
<View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <ArrowLeft color="#fff" /> 
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Update Item</Text>
</View>


      <FlatList
        data={products}
        keyExtractor={(item) => item.qrcode}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Product</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={newQuantity}
              onChangeText={setNewQuantity}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#4CAF50' }]} 
                onPress={handleUpdate}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#f44336' }]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#4CAF50',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 10,
    color: '#fff' // keep white for header
  },

  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 15, 
    marginHorizontal: 10, 
    marginVertical: 5, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 2 
  },
  name: { fontSize: 16, fontWeight: '600', color: '#000' }, 
  quantity: { fontSize: 14, color: '#000' },

  cardActions: { flexDirection: 'row' },
  iconButton: { padding: 8, marginLeft: 10 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#000' },

  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10, color: '#000' }, 

  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});

