"use client";

import { useState } from "react";

export interface ProductFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
}

interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  loading?: boolean;
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  loading,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    category: defaultValues?.category || "",
    price: defaultValues?.price || 0,
    rating: defaultValues?.rating || 0,
    thumbnail: defaultValues?.thumbnail || "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "rating"
          ? Number(value)
          : value,
    }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        name="thumbnail"
        placeholder="Thumbnail URL"
        value={formData.thumbnail}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-3 rounded w-full"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}