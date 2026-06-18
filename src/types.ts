export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // In RWF
  category: 'bags' | 'scarves' | 'hats' | 'sweaters' | 'decor';
  description: string;
  images: string[];
  colors: string[];
  rating: number;
  reviews: Review[];
  customizable: boolean;
  stock: number;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // Unique combination of product id + selectedColor
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface CustomOrderRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  productType: string;
  preferredColors: string[];
  quantity: number;
  imageUrl?: string;
  specialInstructions: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'shipped';
  date: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  district: string;
  sector: string;
  streetAddress: string;
  instructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'momo' | 'airtel' | 'card' | 'cod';
  paymentDetails?: {
    phoneNumber?: string;
    cardNumber?: string;
    cardHolderName?: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  date: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  date: string;
}
