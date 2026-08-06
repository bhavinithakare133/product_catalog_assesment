import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">

      <h1 className="text-8xl font-bold text-blue-600">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-4">
        The page you are looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>

    </div>
  );
}