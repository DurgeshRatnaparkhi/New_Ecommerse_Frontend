import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/orderService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  if (!status) return;

  console.log("Updating Order:", orderId, status);

  this.orderService.updateOrderStatus(orderId, status)
    .subscribe({
      next: (res: any) => {
        console.log("Success:", res);
        Swal.fire(res?.message || "Order status updated successfully");

        // 🔥 Refresh UI
        this.loadOrders();
      },
      error: (err) => {
        console.error("Error:", err);
        Swal.fire("Failed to update order status");
      }
    });
}
}
