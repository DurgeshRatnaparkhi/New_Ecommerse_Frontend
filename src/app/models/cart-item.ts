import { Product } from "./product";

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
}