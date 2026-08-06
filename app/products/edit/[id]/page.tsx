"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProductForm, {
  ProductFormData,
} from "@/components/ProductForm/ProductForm";

import { productService } from "@/services/productService";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [defaultValues, setDefaultValues] =
    useState<ProductFormData | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const product = await productService.getProduct(id);

        setDefaultValues({
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          rating: product.rating,
          thumbnail: product.thumbnail,
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  async function handleSubmit(data: ProductFormData) {
    try {
      setLoading(true);

      await productService.updateProduct(id, data);

      alert("Product updated successfully!");

      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  }

  if (!defaultValues) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <ProductForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}