"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Create Product",
      href: "/products/create",
    },
  ];

  return (
    <header className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          Product Catalog
        </Link>

        <nav className="flex gap-6">

          {navLinks.map((link) => {

            const active =
              pathname === link.href ||
              (link.href === "/products" &&
                pathname.startsWith("/products/") &&
                !pathname.startsWith("/products/create"));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition font-medium ${
                  active
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

        </nav>

      </div>
    </header>
  );
}