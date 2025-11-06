import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "./config";

export const useVendorStore = create((set) => ({
  vendors: [],
  loading: false,
  error: null,

  fetchVendors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/vendors`);
      set({ vendors: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load vendors",
        loading: false,
      });
    }
  },
}));
