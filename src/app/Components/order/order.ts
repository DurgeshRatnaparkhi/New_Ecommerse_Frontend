import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Service/orderService';

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  standalone: false,
  styleUrls: ['./order.css'],   // ✅ fixed
})
export class Order implements OnInit {

  addresses: any[] = [];
  selectedAddressId: number | null = null;

  cartItems: any[] = [];
  grandTotal: number = 0;

  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
    this.loadCart();
  }

  // ✅ Load user addresses
  loadAddresses(): void {
    this.http.get<any>('http://localhost:8080/api/address/user')
      .subscribe({
        next: (data) => {
          this.addresses = data;
        },
        error: (err) => {
          console.error('Failed to load addresses', err);
        }
      });
  }

  // ✅ Load cart summary
  loadCart(): void {
    this.http.get<any>('http://localhost:8080/api/cart')
      .subscribe({
        next: (data) => {
          this.cartItems = data.items;
          this.grandTotal = data.totalAmount;
        },
        error: (err) => {
          console.error('Failed to load cart', err);
        }
      });
  }

  // ✅ Select address
  selectAddress(id: number): void {
    this.selectedAddressId = id;
  }

  // ✅ Confirm order
  confirmOrder(): void {

    if (!this.selectedAddressId) {
      alert("Please select an address");
      return;
    }

    this.loading = true;

    const payload = {
      addressId: this.selectedAddressId
    };

    this.orderService.placeOrder(payload)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/orders']);
        },
        error: (err) => {
          this.loading = false;
          console.error("Order failed", err);
          alert("Order failed!");
        }
      });
  }
}