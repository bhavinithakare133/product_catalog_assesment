import axios from "axios";
import { Product, ProductResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";

export const productService = {
  async getProducts(): Promise<ProductResponse> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

async addProduct(product: Partial<Product>) {
  const response = await axios.post(`${BASE_URL}/add`, product);
  return response.data;
},

async updateProduct(id: number, product: Partial<Product>) {
  const response = await axios.put(`${BASE_URL}/${id}`, product);
  return response.data;
},

async deleteProduct(id: number) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
},
};