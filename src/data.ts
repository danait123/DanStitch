import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Cozy Meadow Totebag',
    price: 32000,
    category: 'bags',
    description: 'This gorgeous handmade shoulder tote is crafted with double-strength organic cotton yarn. It features a sturdy weave, cozy vintage aesthetic, and an inner linen lining with a small pocket. Perfect for books, tablet, or a beautiful day in the Kigali sunshine.',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Oatmeal Cream', 'Olive Green', 'Pastel Pink', 'Mustard Yellow'],
    rating: 4.9,
    stock: 5,
    customizable: true,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Ange Mutoni',
        rating: 5,
        comment: 'Absolutely love my Meadow Tote! The stitch work is incredibly clean and tight. I use it every day for work in Kigali.',
        date: '2026-05-12'
      },
      {
        id: 'rev-2',
        author: 'Innocent K.',
        rating: 4.8,
        comment: 'Beautiful texture. It was a perfect birthday gift for my sister. Very durable!',
        date: '2026-06-01'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Kimironko Dusk Slouchy Beanie',
    price: 15000,
    category: 'hats',
    description: 'Keep warm in style with our signature slouchy beanie. Lovingly crocheted with premium wool blend yarn that is extra soft and completely itch-free. Features a stylish ribbed brim that adapts comfortably to all head sizes.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d4353c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608228088998-57828365d486?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Charcoal Gray', 'Sand Beige', 'Soft Rose', 'Forest Green'],
    rating: 4.8,
    stock: 12,
    customizable: true,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Sonia Uwera',
        rating: 5,
        comment: 'This beanie is so soft and thick. Excellent customer care from Cozy Loops near Kigali Parents School!',
        date: '2026-04-18'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Woven Cloud Cardigan',
    price: 65000,
    category: 'sweaters',
    description: 'Our crown jewel. This magnificent chunky cardigan is handcrafted over 25 hours using premium hypoallergenic yarn. Highly comfortable, heavy-weight drape, and features gorgeous hand-sewn wooden buttons and mock bubble-sleeves.',
    images: [
      'https://images.unsplash.com/photo-1517231922485-52013444a115?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Creamy Pearl', 'Caramel Latte', 'Sage Green'],
    rating: 5.0,
    stock: 2,
    customizable: true,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-4',
        author: 'Divine I.',
        rating: 5,
        comment: 'Literally feels like wrapping yourself in a warm cloud. The craftsmanship represents real artistic genius!',
        date: '2026-06-10'
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Sweet Lavender Cozy Scarf',
    price: 22000,
    category: 'scarves',
    description: 'An elegantly long and thick scarf featuring an intricate waffle-stitch motif that traps heat for peak coziness. Detailed with long hand-knotted fringe edges for a timeless, classy bohemian finish.',
    images: [
      'https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544030113-f219c7c71d1b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Dusty Lavender', 'Creamy Pearl', 'Charcoal Gray', 'Clay Red'],
    rating: 4.7,
    stock: 8,
    customizable: true,
    isFeatured: false,
    reviews: [
      {
        id: 'rev-5',
        author: 'Eric G.',
        rating: 4.5,
        comment: 'Incredibly warm and looks fantastic with coats. Highly recommended.',
        date: '2026-05-20'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Cozy Cable Knit Pillow Cover',
    price: 25000,
    category: 'decor',
    description: 'Transform your living room or bedroom with some handmade warmth. These premium cable-knit pillow covers are crocheted with thick, washable cotton cord. Features a zipper closure hidden carefully beneath a fold.',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Off-White', 'Warm Sand', 'Mocha Brown'],
    rating: 4.9,
    stock: 4,
    customizable: true,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-6',
        author: 'Marie-Claire U.',
        rating: 5,
        comment: 'Incredible texture and fits my 45x45 cm cushions perfectly. Gives such a welcoming vibe!',
        date: '2026-06-15'
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Petite Blossom Handbag',
    price: 28000,
    category: 'bags',
    description: 'A charming, lightweight bag adorned with daisy-inspired crochet squares. Complemented by durable handles, secure wood clasp, and lined internal cavity. Safely fits phone, cosmetic pouch, and sunglasses.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Daisy White & Sage', 'Lavender & Pearl', 'Warm Terracotta'],
    rating: 4.6,
    stock: 6,
    customizable: true,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'prod-7',
    name: 'Amigurumi Safari Giraffe',
    price: 18000,
    category: 'decor',
    description: 'Introducing Gigi the Giraffe. Our amigurumi animals are crocheted with tight single-crochet stitches using child-safe organic cotton thread. Stuffed with hypoallergenic polyfill and fitted with safety eyes.',
    images: [
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Golden Yellow & Brown', 'Pastel Pink & Cream'],
    rating: 5.0,
    stock: 3,
    customizable: true,
    isFeatured: false,
    reviews: [
      {
        id: 'rev-7',
        author: 'Belen T.',
        rating: 5,
        comment: 'So neatly made and adorable. My little daughter holds it everywhere she goes!',
        date: '2026-06-05'
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'Boho Sunset Coaster Set (4x)',
    price: 8000,
    category: 'decor',
    description: 'A gorgeous set of four circular crochet coasters with delicate fringe borders. Absorbs moisture perfectly and washes like a dream. Makes for a marvelous housewarming gift or coffee-table highlight.',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Sunset Mix', 'Forest Green Solid', 'Cream Minimalist'],
    rating: 4.8,
    stock: 15,
    customizable: true,
    isFeatured: false,
    reviews: []
  }
];

export const FAQS = [
  {
    question: 'Where is Cozy Loops located and how do I receive my orders?',
    answer: 'We are proudly based in Kimironko, near Kigali Parents School in Kigali, Rwanda. We offer doorstep delivery throughout Kigali (fees ranging from 1,000 to 2,500 RWF based on distance) and can arrange pick-ups at our location.'
  },
  {
    question: 'How do Custom Orders work?',
    answer: 'Simply navigate to our "Custom Orders" page and fill out the request form detailing your ideas, sizes, preferred colors, and even upload reference images! We will review your request and reach out within 24 hours on WhatsApp or Email with a free quote and timeline.'
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We secure and simplify booking by supporting MTN Mobile Money Rwanda, Airtel Money Rwanda, Credit/Debit Cards, and Cash on Delivery. Select your preference at checkout.'
  },
  {
    question: 'How should I wash and care for my crochet items?',
    answer: 'To preserve the stitches, hand wash is highly recommended in cool water with mild detergent. Lay flat on dry towels to air dry. Do not wring or tumble dry.'
  },
  {
    question: 'What is the typical completion time for custom pieces?',
    answer: 'Small items (hats, beanies, coasters) take 1-3 days. Medium items (bags, shawls) take 3-7 days. Sweaters and large home decor take 1-2 weeks depending on stitch complexity.'
  }
];
