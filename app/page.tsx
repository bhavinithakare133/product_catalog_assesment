import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-6xl font-extrabold text-blue-700">
        Product Catalog
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        Browse, search, filter, create and manage products.
      </p>

      <div className="flex gap-4 mt-10">
        <Link
          href="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Browse Products
        </Link>

        <Link
          href="/products/create"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg"
        >
          Create Product
        </Link>
      </div>
    </main>
  );
}