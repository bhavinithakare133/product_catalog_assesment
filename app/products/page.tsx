"use client";

import { useEffect, useMemo, useState } from "react";

import ProductCard from "@/components/ProductCard/ProductCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import SortDropdown from "@/components/SortDropdown/SortDropdown";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState/EmptyState";
import ErrorState from "@/components/ErrorState/ErrorState";

import { Product } from "@/types/product";
import { productService } from "@/services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getProducts();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter(
        (product) => product.category === category
      );
    }

    switch (sort) {
      case "price-low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return data;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />

        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={(value) => {
            setCategory(value);
            setCurrentPage(1);
          }}
        />

        <SortDropdown
          value={sort}
          onChange={(value) => {
            setSort(value);
            setCurrentPage(1);
          }}
        />

      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

    </div>
  );
}