"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProductForm, {
  ProductFormData,
} from "../../../components/ProductForm/ProductForm";

import { productService } from "@/services/productService";

export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: ProductFormData) {
    try {
      setLoading(true);

      await productService.addProduct(data);

      alert("Product created successfully!");

      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to create product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Product
      </h1>

      <ProductForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}