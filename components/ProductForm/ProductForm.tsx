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

interface Errors {
  title?: string;
  category?: string;
  price?: string;
  rating?: string;
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  loading = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: defaultValues?.title ?? "",
    description: defaultValues?.description ?? "",
    category: defaultValues?.category ?? "",
    price: defaultValues?.price ?? 0,
    rating: defaultValues?.rating ?? 0,
    thumbnail: defaultValues?.thumbnail ?? "",
  });

  const [errors, setErrors] = useState<Errors>({});

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

  function validate() {
    const newErrors: Errors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-lg shadow"
    >
      <div>
        <label className="block font-medium mb-2">
          Product Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">
          Price
        </label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.price && (
          <p className="text-red-500 text-sm mt-1">
            {errors.price}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">
          Rating
        </label>

        <input
          type="number"
          step="0.1"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">
            {errors.rating}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">
          Thumbnail URL
        </label>

        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}