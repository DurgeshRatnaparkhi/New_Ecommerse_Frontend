export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  brand: string;
  category: string;
  sku: string;
  isActive: boolean;
  imageUrl?: string;
  imageData?: any;
}
