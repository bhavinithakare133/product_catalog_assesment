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
    <div className="max-w-6xl mx-auto p-6">

      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg w-full border"
          />
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          <p className="text-gray-500 mt-2 capitalize">
            {product.category}
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-5">
            ₹ {product.price}
          </h2>

          <p className="mt-3 text-lg">
            ⭐ {product.rating}
          </p>

          <p className="mt-6 leading-7">
            {product.description}
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() =>
                router.push(`/products/edit/${product.id}`)
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}