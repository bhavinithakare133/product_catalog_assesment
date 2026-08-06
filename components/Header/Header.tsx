"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <h1 className="text-white text-2xl font-bold">
          Product Catalog
        </h1>

        <nav className="flex gap-6 text-white">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/products/create">Create Product</Link>
        </nav>
      </div>
    </header>
  );
}