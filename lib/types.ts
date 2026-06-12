export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  category: string;
  collection?: string;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string; // Unique ID for cart item (product.id + color + size)
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}
