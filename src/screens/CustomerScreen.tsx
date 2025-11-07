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
import { useCustomerStore } from '../store/customer'; 
import moment from 'moment';
import { moderateScale } from '../utils/scalingUtils';
import { BASE_URL } from '../store/config';

export const CustomerScreen = ({ navigation }) => {
  const { customers, fetchCustomers, loading } = useCustomerStore();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (search === '') setFiltered(customers);
    else {
      const filteredList = customers.filter(c =>
        c.customerName.toLowerCase().includes(search.toLowerCase()) ||
        String(c.id).includes(search)
      );
      setFiltered(filteredList);
    }
  }, [search, customers]);

  const handleAddCustomer = async () => {
    if (!newCustomerName.trim()) {
      Alert.alert('Error', 'Customer name cannot be empty');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/customers`, {
        customerName: newCustomerName.trim()
      });
      Alert.alert('Success', 'Customer added successfully');
      setModalVisible(false);
      setNewCustomerName('');
      fetchCustomers();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add customer');
    }
  };

  const handleDeleteCustomer = (customerId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this customer?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/customers/${customerId}`);
              Alert.alert('Deleted', 'Customer deleted successfully');
              fetchCustomers();
            } catch (err) {
              console.error(err);
              Alert.alert('Error', 'Failed to delete customer');
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
        <Text style={styles.name}>Name: {item.customerName}</Text>
        <Text style={styles.date}>Created: {moment(item.createdAt).format('DD MMM YYYY')}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteCustomer(item.id)}>
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
        <Text style={styles.headerTitle}>Customers</Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search by name or ID..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: moderateScale(20) }} />
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
            <Text style={styles.modalTitle}>Add Customer</Text>
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              placeholderTextColor="#888"
              value={newCustomerName}
              onChangeText={setNewCustomerName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#4CAF50' }]} onPress={handleAddCustomer}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#f44336' }]} onPress={() => setModalVisible(false)}>
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
    backgroundColor: '#4CAF50', 
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
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 , color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10, color: '#000' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});
