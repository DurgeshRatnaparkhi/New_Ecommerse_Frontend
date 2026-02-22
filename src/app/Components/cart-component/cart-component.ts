import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartService } from '../../Service/cart-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit {

  cart: Cart | null = null;  // Cart is interface model

  constructor(private cartService: CartService, private router:Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: cart => this.cart = cart,
      error: () => alert('Failed to load cart')
    });
  }

  increaseQty(productId: number) {
    this.cartService.increaseQuantity(productId).subscribe({
      next: () => this.loadCart(),
      error: () => alert('Failed to increase quantity')
    });
  }

  decreaseQty(productId: number) {
    this.cartService.decreaseQuantity(productId).subscribe({
      next: () => this.loadCart(),
      error: () => alert('Failed to decrease quantity')
    });
  }
  goToOrderPage() {
  this.router.navigate(['/order']);
}
}
