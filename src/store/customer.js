import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from './config';
export const useCustomerStore = create((set) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/customers`);
      set({ customers: res.data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch customers', loading: false });
    }
  },
}));
