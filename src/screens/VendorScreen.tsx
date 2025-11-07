import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator, 
  Modal,
  Alert
} from 'react-native';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react-native';
import axios from 'axios';
import { useVendorStore } from '../store/vendor'; 
import moment from 'moment';
import { moderateScale } from '../utils/scalingUtils';
import { BASE_URL } from '../store/config'; 

export const VendorScreen = ({ navigation }) => {
  const { vendors, fetchVendors, loading } = useVendorStore();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newVendorName, setNewVendorName] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (search === '') setFiltered(vendors);
    else {
      const filteredList = vendors.filter(v =>
        v.vendorName.toLowerCase().includes(search.toLowerCase()) ||
        String(v.id).includes(search)
      );
      setFiltered(filteredList);
    }
  }, [search, vendors]);

  const handleAddVendor = async () => {
    if (!newVendorName.trim()) {
      Alert.alert('Error', 'Vendor name cannot be empty');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/vendors`, {
        vendorName: newVendorName.trim()
      });
      Alert.alert('Success', 'Vendor added successfully');
      setModalVisible(false);
      setNewVendorName('');
      fetchVendors();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add vendor');
    }
  };

  const handleDeleteVendor = (vendorId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this vendor?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/vendors/${vendorId}`);
              Alert.alert('Deleted', 'Vendor deleted successfully');
              fetchVendors();
            } catch (err) {
              console.error(err);
              Alert.alert('Error', 'Failed to delete vendor');
            }
          } 
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.id}>ID: {item.id}</Text>
        <Text style={styles.name}>Name: {item.vendorName}</Text>
        <Text style={styles.date}>Created: {moment(item.createdAt).format('DD MMM YYYY')}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteVendor(item.id)}>
        <Trash2 color="red" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendors</Text>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search by name or ID..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: moderateScale(20) }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
      >
        <Plus color="#fff" size={24} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Vendor</Text>
            <TextInput
              style={styles.input}
              placeholder="Vendor Name"
              value={newVendorName}
              onChangeText={setNewVendorName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#4CAF50' }]} 
                onPress={handleAddVendor}
              >
                <Text style={styles.modalButtonText}>Add</Text>
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
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: moderateScale(15), 
    backgroundColor: '#2196F3', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  headerTitle: { 
    fontSize: moderateScale(20), 
    fontWeight: 'bold', 
    color: '#fff',
    marginLeft: moderateScale(10) 
  },
  search: { 
    margin: moderateScale(10), 
    backgroundColor: '#fff', 
    padding: moderateScale(10), 
    borderRadius: moderateScale(8), 
    borderWidth: 1, 
    borderColor: '#ccc',
    color: '#000', 
  },
  card: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', 
    padding: moderateScale(15), 
    marginHorizontal: moderateScale(10), 
    marginVertical: moderateScale(5), 
    borderRadius: moderateScale(10), 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: moderateScale(5), 
    elevation: 2 
  },
  id: { fontSize: moderateScale(14), color: '#000', marginBottom: moderateScale(5) }, 
  name: { fontSize: moderateScale(16), fontWeight: 'bold', color: '#000', marginBottom: moderateScale(5) }, 
  date: { fontSize: moderateScale(14), color: '#000' },

  fab: {
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20),
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15,color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10, color: '#000' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});
