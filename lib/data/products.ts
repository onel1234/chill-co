import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'oversized-signature-tee',
    slug: 'oversized-signature-tee',
    name: 'Oversized Signature Tee',
    price: 3299,
    description: 'Oversized fit, premium heavyweight cotton, designed for the everyday. We push boundaries with innovative designs that challenge the norm.',
    images: [
      'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310636/shirt_1_g28hja.jpg',
      'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310752/shirt_2_dg42sf.jpg',
    ],
    colors: [
      { name: 'Ceylon Cinnamon', hex: '#7d5b31' },
      { name: 'Yellow Green', hex: '#A8C256' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'Urban Kinetic',
    isNewArrival: true,
    loyaltyPoints: 50
  },
  {
    id: 'different-oversized-tee',
    slug: 'different-oversized-tee',
    name: 'The "Different" Oversized Tee',
    price: 3299,
    description: 'A unique take on our classic oversized tee, featuring subtle details and a relaxed fit.',
    images: [
      'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310752/shirt_2_dg42sf.jpg',
    ],
    colors: [
      { name: 'Off-White', hex: '#F0EAD6' },
      { name: 'Ash', hex: '#B2BEB5' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'The Signature Series',
    isNewArrival: true,
    loyaltyPoints: 45
  },
  {
    id: 'kinetic-drop-tee',
    slug: 'kinetic-drop-tee',
    name: 'Kinetic Drop Tee',
    price: 3299,
    description: 'High-energy streetwear silhouette crafted from premium heavyweight cotton. Built for the streets, made for Sri Lanka.',
    images: [
      'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310779/shirt_3_ficcf7.jpg',
    ],
    colors: [
      { name: 'Heather Grey', hex: '#9CA3AF' },
      { name: 'Midnight Black', hex: '#1a1a1a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Tees',
    collection: 'Urban Kinetic',
    isNewArrival: true,
    loyaltyPoints: 50
  },
  {
    id: 'midnight-drop-tee',
    slug: 'midnight-drop-tee',
    name: 'Midnight Drop Tee',
    price: 3299,
    description: 'Dark mode activated. Inspired by the quiet streets of Colombo at night — bold graphics, clean lines, effortless cool.',
    images: [
      'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310821/shirt_4_hkphui.jpg',
    ],
    colors: [
      { name: 'Pure Black', hex: '#111111' },
      { name: 'Dark Olive', hex: '#4a4a2a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'Midnight Drop',
    isNewArrival: false,
    loyaltyPoints: 50
  },
  {
    id: 'staples-heavyweight-tee',
    slug: 'staples-heavyweight-tee',
    name: 'Staples Heavyweight Tee',
    price: 3299,
    description: 'The foundation of every wardrobe. Premium heavyweight cotton, oversized silhouette, built to last. The everyday essential.',
    images: [
      'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310856/shirt_5_u6qrf6.jpg',
    ],
    colors: [
      { name: 'Stone Grey', hex: '#8C8C8C' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'Essentials',
    isNewArrival: false,
    loyaltyPoints: 50
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};
