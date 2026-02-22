import { Component } from '@angular/core';
import { OrderService } from '../../Service/orderService';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

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
