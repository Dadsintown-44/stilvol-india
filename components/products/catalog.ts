export type Product = {
  id: string;
  title: string;
  designer: string;
  price: string;
  image: string;
  colors: string[];
};

export type Subcategory = {
  slug: string;
  name: string;
  description: string;
  products: Product[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
};

export const productCatalog: Category[] = [
  {
    slug: 'wardrobe-systems',
    name: 'Wardrobe Systems',
    description: 'Premium wardrobes and modular storage for modern interiors.',
    image: '/products/image2.jpg',
    subcategories: [
      {
        slug: 'sliding-wardrobes',
        name: 'Sliding Wardrobes',
        description: 'Smooth-operating sliding wardrobe systems.',
        products: [
          {
            id: 'ws-1',
            title: 'Modern Sliding Wardrobe',
            designer: 'Stilvoll Collection',
            price: '$1,200 USD',
            image: '/products/image2.jpg',
            colors: ['bg-gray-400', 'bg-[#D2B48C]'],
          },
          {
            id: 'ws-2',
            title: 'Aluminum Framed Sliding Doors',
            designer: 'Stilvoll Design',
            price: '$1,100 USD',
            image: '/products/image9.jpg',
            colors: ['bg-stone-600', 'bg-stone-400'],
          },
        ],
      },
      {
        slug: 'open-wardrobes',
        name: 'Open Wardrobes',
        description: 'Minimalist open wardrobe profiles and layouts.',
        products: [
          {
            id: 'ws-3',
            title: 'Minimalist Open Wardrobe',
            designer: 'Contemporary Line',
            price: '$890 USD',
            image: '/products/image8.jpg',
            colors: ['bg-stone-200'],
          },
          {
            id: 'ws-4',
            title: 'Walk-in Closet Profile',
            designer: 'Modular Designs',
            price: '$380 USD',
            image: '/products/image4.jpg',
            colors: ['bg-[#E5E4E2]', 'bg-stone-800'],
          },
        ],
      },
    ],
  },
  {
    slug: 'glass-partitions',
    name: 'Glass & Partitions',
    description: 'Architectural glass partitions and fluted systems.',
    image: '/products/image3.jpg',
    subcategories: [
      {
        slug: 'partition-systems',
        name: 'Partition Systems',
        description: 'Frameless and framed glass partition solutions.',
        products: [
          {
            id: 'gp-1',
            title: 'Glass Partition System',
            designer: 'Premium Series',
            price: '$450 USD',
            image: '/products/image3.jpg',
            colors: ['bg-amber-600', 'bg-stone-300'],
          },
          {
            id: 'gp-2',
            title: 'Fluted Glass Partition',
            designer: 'Architectural Solutions',
            price: '$1,050 USD',
            image: '/products/image7.jpg',
            colors: ['bg-gray-500'],
          },
        ],
      },
      {
        slug: 'space-structure',
        name: 'Space & Structure',
        description: 'Premium structural glass applications.',
        products: [
          {
            id: 'gp-3',
            title: 'Space & Structure Panel',
            designer: 'Premium Series',
            price: '$980 USD',
            image: '/products/image13.jpg',
            colors: ['bg-stone-400'],
          },
        ],
      },
    ],
  },
  {
    slug: 'aluminium-profiles',
    name: 'Aluminium Profiles',
    description: 'Profiles for shutters, sliding systems, and fittings.',
    image: '/products/image4.jpg',
    subcategories: [
      {
        slug: 'shutter-profiles',
        name: 'Shutter Profiles',
        description: 'Durable shutter and frame profiles.',
        products: [
          {
            id: 'ap-1',
            title: 'Shutter Profile Series A',
            designer: 'Stilvoll Collection',
            price: '$320 USD',
            image: '/products/image4.jpg',
            colors: ['bg-[#E5E4E2]', 'bg-stone-800'],
          },
        ],
      },
      {
        slug: 'sliding-profiles',
        name: 'Sliding Profiles',
        description: 'Heavy-duty sliding door and wardrobe profiles.',
        products: [
          {
            id: 'ap-2',
            title: 'Sliding Profile Series B',
            designer: 'Modular Designs',
            price: '$410 USD',
            image: '/products/image9.jpg',
            colors: ['bg-stone-600', 'bg-stone-400'],
          },
        ],
      },
    ],
  },
  {
    slug: 'door-hardware',
    name: 'Door Hardware',
    description: 'Door control systems and architectural hardware.',
    image: '/products/image7.jpg',
    subcategories: [
      {
        slug: 'door-control',
        name: 'Door Control Systems',
        description: 'Closers, hinges, and control hardware.',
        products: [
          {
            id: 'dh-1',
            title: 'Door Control Kit Pro',
            designer: 'Architectural Solutions',
            price: '$540 USD',
            image: '/products/image7.jpg',
            colors: ['bg-gray-500'],
          },
        ],
      },
    ],
  },
  {
    slug: 'kitchen-hardware',
    name: 'Kitchen Hardware',
    description: 'Modular kitchen drawers, fittings, and accessories.',
    image: '/products/image8.jpg',
    subcategories: [
      {
        slug: 'modular-drawers',
        name: 'Modular Drawers',
        description: 'Soft-close drawer systems and runners.',
        products: [
          {
            id: 'kh-1',
            title: 'Modular Kitchen Drawer System',
            designer: 'Stilvoll Collection',
            price: '$620 USD',
            image: '/products/image8.jpg',
            colors: ['bg-stone-200'],
          },
        ],
      },
      {
        slug: 'kitchen-fittings',
        name: 'Kitchen Fittings',
        description: 'Handles, organizers, and hardware sets.',
        products: [
          {
            id: 'kh-2',
            title: 'Kitchen Fitting Set Elite',
            designer: 'Premium Series',
            price: '$290 USD',
            image: '/products/image2.jpg',
            colors: ['bg-gray-400', 'bg-[#D2B48C]'],
          },
        ],
      },
    ],
  },
];
