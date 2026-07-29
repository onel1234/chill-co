import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'oversized-signature-tee',
    slug: 'oversized-signature-tee',
    name: 'Oversized Signature Tee',
    price: 48,
    description: 'Oversized fit, premium heavyweight cotton, designed for the everyday. We push boundaries with innovative designs that challenge the norm.',
    images: [
      '/images/kinetic_tshirt.png',
      '/images/black-tshirt-back.png',
      '/images/black-tshirt.png'
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
    price: 45,
    description: 'A unique take on our classic oversized tee, featuring subtle details and a relaxed fit.',
    images: [
      '/images/signature_series.png'
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
    id: 'core-heavyweight-hoodie',
    slug: 'core-heavyweight-hoodie',
    name: 'Core Heavyweight Hoodie',
    price: 85,
    description: 'Our core hoodie designed for ultimate comfort and warmth. Perfect for layering.',
    images: [
      '/images/midnight_tshirt.png'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#9CA3AF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Hoodies',
    collection: 'Essentials',
    isNewArrival: false,
    loyaltyPoints: 100
  },
  {
    id: 'everyday-classic-tee',
    slug: 'everyday-classic-tee',
    name: 'Everyday Classic Tee',
    price: 35,
    description: 'The foundation of your wardrobe. Simple, clean, and perfectly fitting.',
    images: [
      '/images/staples_tshirt.png'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'Essentials',
    isNewArrival: false,
    loyaltyPoints: 30
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};
