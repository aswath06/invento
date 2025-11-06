import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "./config";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${BASE_URL}/products`);
      set({ products: res.data, loading: false });
    } catch (err) {
      console.error("Error fetching products:", err.message);
      if (err.response) console.error("Response error:", err.response.data);
      else if (err.request) console.error("Request error: No response from server");
      set({ error: "Failed to fetch products", loading: false });
    }
  },
}));
