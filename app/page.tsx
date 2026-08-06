import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">

      <h1 className="text-5xl font-bold mb-6">
        Product Catalog
      </h1>

      <p className="text-gray-600 mb-8">
        Browse, Search, Create, Edit and Manage Products
      </p>

      <Link
        href="/products"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        View Products
      </Link>

    </main>
  );
}