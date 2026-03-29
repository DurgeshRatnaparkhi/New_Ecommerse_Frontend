import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/orderService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  standalone: false,
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrdersAdmin().subscribe({
      next: (res: any) => {
        this.orders = res;
        this.loading = false;
      },
      error: () => {
        alert("Failed to load orders");
        this.loading = false;
      }
    });
  }

  viewOrder(id: number) {
    this.router.navigate(['/order-details', id]);
  }

  updateStatus(orderId: number, event: any) {
    const status = event.target.value;

    this.orderService.updateOrderStatus(orderId, status)
      .subscribe(() => {
        alert("Status updated");
        this.loadOrders();
      });
  }
}
