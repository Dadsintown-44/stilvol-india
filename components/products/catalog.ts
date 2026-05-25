export type ColorVariant = {
  name: string;
  swatch: string;
};

export type Product = {
  id: string;
  title: string;
  designer: string;
  priceInr: number;
  image: string;
  description: string;
  size: string;
  colorVariants: ColorVariant[];
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

export function formatPriceInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

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
            priceInr: 99600,
            image: '/products/image2.jpg',
            description:
              'Full-height sliding wardrobe with soft-close track system, ideal for bedrooms and walk-in closets. Premium finish with modular internal layouts.',
            size: '240 cm (W) × 220 cm (H) × 65 cm (D)',
            colorVariants: [
              { name: 'Graphite Grey', swatch: 'bg-gray-400' },
              { name: 'Warm Oak', swatch: 'bg-[#D2B48C]' },
              { name: 'Matte White', swatch: 'bg-stone-200' },
            ],
          },
          {
            id: 'ws-2',
            title: 'Aluminum Framed Sliding Doors',
            designer: 'Stilvoll Design',
            priceInr: 91300,
            image: '/products/image9.jpg',
            description:
              'Slim aluminium frame sliding doors with toughened glass infill. Engineered for smooth glide and long-term durability in residential and commercial spaces.',
            size: 'Custom width up to 360 cm × 240 cm (H)',
            colorVariants: [
              { name: 'Anthracite', swatch: 'bg-stone-600' },
              { name: 'Silver Grey', swatch: 'bg-stone-400' },
              { name: 'Bronze', swatch: 'bg-amber-700' },
            ],
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
            priceInr: 73870,
            image: '/products/image8.jpg',
            description:
              'Open-profile wardrobe system with hanging rails, shelves, and optional drawer modules. Clean lines for contemporary interiors.',
            size: '180 cm (W) × 200 cm (H) × 55 cm (D)',
            colorVariants: [
              { name: 'Pearl White', swatch: 'bg-stone-200' },
              { name: 'Light Ash', swatch: 'bg-stone-300' },
            ],
          },
          {
            id: 'ws-4',
            title: 'Walk-in Closet Profile',
            designer: 'Modular Designs',
            priceInr: 31540,
            image: '/products/image4.jpg',
            description:
              'Aluminium profile kit for walk-in closet partitioning and shelving. Compatible with standard modular fittings.',
            size: 'Profile length: 3 m per piece (cut-to-size available)',
            colorVariants: [
              { name: 'Champagne', swatch: 'bg-[#E5E4E2]' },
              { name: 'Matte Black', swatch: 'bg-stone-800' },
            ],
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
            priceInr: 37350,
            image: '/products/image3.jpg',
            description:
              'Frameless glass partition for offices and living spaces. Includes top and bottom track with safety tempered glass.',
            size: 'Panel: 90 cm (W) × 240 cm (H) per module',
            colorVariants: [
              { name: 'Bronze Glass', swatch: 'bg-amber-600' },
              { name: 'Clear Frost', swatch: 'bg-stone-300' },
              { name: 'Smoked Grey', swatch: 'bg-gray-500' },
            ],
          },
          {
            id: 'gp-2',
            title: 'Fluted Glass Partition',
            designer: 'Architectural Solutions',
            priceInr: 87150,
            image: '/products/image7.jpg',
            description:
              'Decorative fluted glass partition with aluminium channel frame. Adds privacy while preserving natural light flow.',
            size: '120 cm (W) × 270 cm (H) per panel',
            colorVariants: [
              { name: 'Fluted Clear', swatch: 'bg-gray-500' },
              { name: 'Fluted Bronze', swatch: 'bg-amber-700' },
            ],
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
            priceInr: 81340,
            image: '/products/image13.jpg',
            description:
              'Structural glass panel system for feature walls and zone separation. Premium hardware and silicone glazing included.',
            size: '150 cm (W) × 300 cm (H)',
            colorVariants: [
              { name: 'Stone Grey', swatch: 'bg-stone-400' },
              { name: 'Ice Clear', swatch: 'bg-stone-200' },
            ],
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
            priceInr: 26560,
            image: '/products/image4.jpg',
            description:
              'Heavy-duty aluminium shutter profile with reinforced wall thickness for kitchen and wardrobe shutters.',
            size: 'Standard bar: 19 mm × 3 m length',
            colorVariants: [
              { name: 'Champagne', swatch: 'bg-[#E5E4E2]' },
              { name: 'Matte Black', swatch: 'bg-stone-800' },
            ],
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
            priceInr: 34030,
            image: '/products/image9.jpg',
            description:
              'Top-hung and bottom-guided sliding profiles for wardrobe and partition systems. Corrosion-resistant anodized finish.',
            size: 'Track profile: 25 mm × 3 m length',
            colorVariants: [
              { name: 'Anthracite', swatch: 'bg-stone-600' },
              { name: 'Silver Grey', swatch: 'bg-stone-400' },
            ],
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
            priceInr: 44820,
            image: '/products/image7.jpg',
            description:
              'Complete door control kit with hydraulic closer, hinges, and floor spring options for glass and wooden doors.',
            size: 'For door weight up to 80 kg',
            colorVariants: [
              { name: 'Brushed Steel', swatch: 'bg-gray-500' },
              { name: 'Matte Black', swatch: 'bg-stone-800' },
            ],
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
            priceInr: 51460,
            image: '/products/image8.jpg',
            description:
              'Soft-close drawer runners with full extension and high load capacity. Suitable for base and pan drawers.',
            size: '450 mm & 500 mm drawer lengths',
            colorVariants: [
              { name: 'Pearl White', swatch: 'bg-stone-200' },
              { name: 'Graphite', swatch: 'bg-gray-500' },
            ],
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
            priceInr: 24070,
            image: '/products/image2.jpg',
            description:
              'Elite kitchen handle and organizer set including knobs, pulls, and mounting hardware for modular kitchens.',
            size: 'Set of 12 pieces (mixed sizes)',
            colorVariants: [
              { name: 'Graphite Grey', swatch: 'bg-gray-400' },
              { name: 'Warm Oak', swatch: 'bg-[#D2B48C]' },
              { name: 'Brushed Nickel', swatch: 'bg-stone-300' },
            ],
          },
        ],
      },
    ],
  },
];
