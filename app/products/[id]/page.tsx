"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Product } from "@/types/product";
import { productService } from "@/services/productService";
import Loader from "@/components/Loader/Loader";
import ErrorState from "@/components/ErrorState/ErrorState";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
        setError("Unable to fetch product.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        Product not found.
      </div>
    );
  }

  async function handleDelete() {
      if (!product) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await productService.deleteProduct(product.id);

      alert("Product deleted successfully!");

      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  }

  return (
  <div className="max-w-7xl mx-auto p-8">

    <button
      onClick={() => router.back()}
      className="mb-8 text-blue-600 hover:text-blue-800 font-medium"
    >
      ← Back to Products
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg p-8">

      {/* Product Image */}
      <div>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          className="rounded-xl w-full border shadow"
        />
      </div>

      {/* Product Details */}
      <div>

        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {product.category}
        </span>

        <h1 className="text-4xl font-bold mt-4">
          {product.title}
        </h1>

        {product.brand && (
          <p className="text-lg text-gray-600 mt-2">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>
        )}

        <div className="flex items-center gap-6 mt-6">

          <p className="text-4xl font-bold text-green-600">
            ₹ {product.price}
          </p>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
            ⭐ {product.rating}
          </span>

        </div>

        <p className="text-gray-700 leading-8 mt-8">
          {product.description}
        </p>

        {/* Product Info */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="border rounded-xl p-4">
            <p className="text-gray-500 text-sm">
              Stock
            </p>

            <p className="text-xl font-bold">
              {product.stock}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500 text-sm">
              Discount
            </p>

            <p className="text-xl font-bold text-red-500">
              {product.discountPercentage}%
            </p>
          </div>

          {product.weight && (
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Weight
              </p>

              <p className="text-xl font-bold">
                {product.weight} g
              </p>
            </div>
          )}

          {product.sku && (
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                SKU
              </p>

              <p className="text-xl font-bold">
                {product.sku}
              </p>
            </div>
          )}

        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-10">

          <button
            onClick={() =>
              router.push(`/products/edit/${product.id}`)
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition"
          >
            ✏️ Edit Product
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            🗑 Delete Product
          </button>

        </div>

      </div>

    </div>

  </div>
);
}