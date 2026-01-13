import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private BASE_URL = 'http://localhost:8081/api/cart';

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ ADD TO CART
  addToCart(productId: number, quantity: number) {
    return this.http.post(`${this.BASE_URL}/add`, { productId, quantity });
  }

  // ✅ GET CART
  getCart() {
    return this.http.get<Cart>(`${this.BASE_URL}`).pipe(
      tap(cart => {
        if (cart && cart.items) {
          this.cartCountSubject.next(cart.items.length);
        } else {
          this.cartCountSubject.next(0);
        }
      })
    );
  }

  // ✅ INCREASE QUANTITY
  increaseQuantity(productId: number) {
    return this.http.put<Cart>(
      `${this.BASE_URL}/increase/${productId}`,
      {}
    ).pipe(
      tap(cart => this.cartCountSubject.next(cart.items.length))
    );
  }

  // ✅ DECREASE QUANTITY
  decreaseQuantity(productId: number) {
    return this.http.put<Cart>(
      `${this.BASE_URL}/decrease/${productId}`,
      {}
    ).pipe(
      tap(cart => this.cartCountSubject.next(cart.items.length))
    );
  }
}
