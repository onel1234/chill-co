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

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}
