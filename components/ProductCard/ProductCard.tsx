import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white cursor-pointer hover:-translate-y-1">

        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={250}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">

          <p className="text-sm text-blue-600 font-medium">
            {product.brand}
          </p>

          <h2 className="font-bold text-lg mt-1 line-clamp-2">
            {product.title}
          </h2>

          <p className="text-gray-500 text-sm capitalize mt-2">
            {product.category}
          </p>

          <div className="flex justify-between items-center mt-4">

            <span className="text-2xl font-bold text-green-600">
              ₹ {product.price}
            </span>

            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
              ⭐ {product.rating}
            </span>

          </div>

          <div className="flex justify-between mt-4 text-sm">

            <span className="text-gray-600">
              Stock: {product.stock}
            </span>

            <span className="text-red-500 font-medium">
              {product.discountPercentage}% OFF
            </span>

          </div>

          <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            View Details →
          </button>

        </div>
      </div>
    </Link>
  );
}