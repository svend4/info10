export interface Flower {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  available: boolean;
}

export interface CartItem {
  flower: Flower;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  phone: string;
  address: string;
  comment?: string;
  createdAt: Date;
}

export type FilterCategory = 'all' | 'roses' | 'tulips' | 'orchids' | 'mixed';

export interface FilterOptions {
  category: FilterCategory;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
}
