import { Component } from '@angular/core';
import { OrderService } from '../../Service/orderService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl:'./my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {

  orders: any[] = [];

  constructor(private orderService: OrderService, private router:Router) {}

  viewOrder(id: number) {
  this.router.navigate(['/order-details', id]);
}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getMyOrders()
      .subscribe((data: any) => {
        this.orders = data;
      });
  }

}
