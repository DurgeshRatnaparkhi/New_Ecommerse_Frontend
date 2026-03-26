import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../Service/orderService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl:'./order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit 

{
     orderId!: number;
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrderById(this.orderId).subscribe(res => {
      this.order = res;
    });
  }

 cancelOrder() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!"
  })
  .then((result) => {

    if (result.isConfirmed) {

      this.orderService.cancelOrder(this.orderId).subscribe({
        next: () => {
          Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
          this.loadOrder();
        },
        
      });

    }

  });
}
}
