export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  category: 'Tees' | 'Hoodies' | 'Accessories';
  collection: string;
  isNewArrival: boolean;
  loyaltyPoints?: number;
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
  loyaltyPoints?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url?: string;
  is_admin: boolean;
  loyalty_points: number;
  is_loyalty_member: boolean;
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

export interface AffiliateCode {
  id: string;
  user_id: string;
  code: string;
  is_active: boolean;
  total_referrals: number;
  created_at: string;
}

export interface AffiliateReferral {
  id: string;
  affiliate_user_id: string;
  referred_user_id: string;
  code_used: string;
  points_awarded: number;
  created_at: string;
}

export interface AffiliateSettings {
  points_per_referral: number;
  max_codes_per_user: number;
}
