import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'oversized-signature-tee',
    slug: 'oversized-signature-tee',
    name: 'Oversized Signature Tee',
    price: 48,
    description: 'Oversized fit, premium heavyweight cotton, designed for the everyday. We push boundaries with innovative designs that challenge the norm.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwZxAZ1zfzc6eSw-J3lImQAyU1XNzPBi860bWf1Qbti_xfPNStJPyjVdQrJqNcmIcg3raT3gt7YRuuBRtTdbzNAJNc_2TfX9nAr2UedV5hYffalXylgYfic1IjpoOGNsP9vjecDBJC5RGXAwaHCoruPDmTWaEq_2yY8y42s3ED_QwVHECdhAnY4deRPcNqxISS9Z3rJGGkDENWROP9An1l1vqTi0s16udtHg3hPI3P6pcnyBc0qNIgXY3X8HlZmdGbLV06ARmmRD8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBh11HZa9W3IeOE3nJw6SVMtcLaGXLnoSLYB969ofLjo0_16xbK9l0fueNfpIRBbo6b2DB4wLhHH71KcjRefIjRYZT_Td-bzZA61Ph44Z4OOblOTlTa01R_VgvhyoUP2TaTwTOpgvHvb-q8lBjajGrziK_dCgI81uasfW1s6tfXOJCNAIo8rjsEsX8oG8nF6UqRieMXZWTjqAU7katDARMrsF-YF60z45DksicLUmEynC5Ec5_BChySBJWDvYCB3TpdRzjFYsN6J8U',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbBV-anVnr6wVgeFeZ_RrgdEkJgKBgTYoKbG-0Kw4o56W2GPIHNQqQ9EqQQ6igsFBP3_Ie7NhshDTSvP3b-mqlZ1ljwNtkQMWqndJmZf4m-CsXihC_QdsctSAR0oyEG16xpG9wK__eO6ti4bU0JZX9HXGafUl-FaD8c-3OLDTm3RqJkWDjmc0G5hGFZoun2L_l6a1dPvHtCkur7fGCHV9Rnjgq0BMn-4NEA582HfxI216msFHw1sIzlTqpdObZVx_qGo15ca9ICDk'
    ],
    colors: [
      { name: 'Harvest Orange', hex: '#F37B21' },
      { name: 'Yellow Green', hex: '#A8C256' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'Urban Kinetic',
    isNewArrival: true
  },
  {
    id: 'different-oversized-tee',
    slug: 'different-oversized-tee',
    name: 'The "Different" Oversized Tee',
    price: 45,
    description: 'A unique take on our classic oversized tee, featuring subtle details and a relaxed fit.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1VzJMnLSSXBMrMZ3M01fEj0Tj8a9cIMkSS6VazeTtz9xoFWsvgWohz4wy1pLzBnuTxnjvPViQPvG6xQz3HCX9AuqwiwwkKThP7jGxs9pE2PXr7v2sozniLsxnBxvA4AN_KJfCgHqW6RbMhCXHRt2vRjj1KqKHN3wkIAeAk3sxg3Gdq0Twpe5rYAHYq8h-6k9EJ8-L60s144E1pwjz4WqK4Ea00js9QtkWKZlXB_dYpYClSyyRxuhDklUyw5DFrYKOYcmLa61BKZM'
    ],
    colors: [
      { name: 'Off-White', hex: '#F0EAD6' },
      { name: 'Ash', hex: '#B2BEB5' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'The Signature Series',
    isNewArrival: true
  },
  {
    id: 'core-heavyweight-hoodie',
    slug: 'core-heavyweight-hoodie',
    name: 'Core Heavyweight Hoodie',
    price: 85,
    description: 'Our core hoodie designed for ultimate comfort and warmth. Perfect for layering.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6F7YQ9PyYSmAjl8vm5yWdzmH98OONl1ocPDASo9X8LRbDBPG7RIDFyQwoSuQzEL5IYP0rU903qeLgzB7HIhLZJH9JTfPtEOLemhtIlFcnSKK-DwUtikvHKBhD_9ZAay5WJwVc0vOjW5-U5AW4t6oPeufmFW2IblVChlOY9xEH84YjNHrzWgLbzl_3V7jkx-s75jWD6DcaJOdErorPzM3FdxIeJpwE-3TohTNHCF9WXs0-xgcI-BJb1EHW6QAwOlHF6ZyxIM0EP5Y'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#9CA3AF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Hoodies',
    collection: 'Essentials',
    isNewArrival: false
  },
  {
    id: 'everyday-classic-tee',
    slug: 'everyday-classic-tee',
    name: 'Everyday Classic Tee',
    price: 35,
    description: 'The foundation of your wardrobe. Simple, clean, and perfectly fitting.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRAcpPheU9yWtfp70IsZIs4iy3ChierRHF1y8TRRc5G1oWaVuXjNiMXsjhSo4CNfQCNEbZJD0qcrsl7pzrhfeIujbhHfpEDtZUqEIhO_Zn4dK0fY196UnyLz7CGerAN90-PaF3TL0ZgztJ2iggYr_IHna79exD0BkyqdfBvmTyRsC68xAMeR5tZhlyLHae11Ru7BT0XkDsuLvXk7mFrysu4gvfa57ugJoeoa_fQExGWTfnvKrdweOScMlK-E8ypFF93YmD8p0aciw'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    collection: 'Essentials',
    isNewArrival: false
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};
