import { CartItem } from "./cart-item";

export interface Cart {
  id: number;
  totalAmount: number;
  items: CartItem[];
}