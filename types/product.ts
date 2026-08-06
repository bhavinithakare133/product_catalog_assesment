export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;

  sku?: string;
  weight?: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}