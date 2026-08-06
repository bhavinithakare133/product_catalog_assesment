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
      <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer">

        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded"
        />

        <h2 className="font-bold text-lg mt-3">
          {product.title}
        </h2>

        <p className="text-gray-500">
          {product.category}
        </p>

        <p className="font-semibold mt-2 text-green-600">
          ₹ {product.price}
        </p>

        <p className="mt-2">
          ⭐ {product.rating}
        </p>

      </div>
    </Link>
  );
}