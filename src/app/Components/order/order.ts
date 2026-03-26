import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Service/orderService';
import { AddressService } from '../../Service/address-service';
import { CartService } from '../../Service/cart-service';

declare var Razorpay: any;   // ✅ ADD THIS

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  standalone: false,
  styleUrls: ['./order.css'],
})
export class Order implements OnInit {

  addresses: any[] = [];
  cartItems: any[] = [];
  grandTotal = 0;

  selectedAddressId: number | null = null;
  showAddressForm = false;
  loading = false;

  newAddress = {
    fullName: '',
    mobile: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  };
order: any;

  constructor(
    private addressService: AddressService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
    this.loadCart();
  }

  loadAddresses() {
    this.addressService.getUserAddresses(this.newAddress).subscribe({
      next: (data) => {
        this.addresses = data;

        if (data.length > 0) {
          this.selectedAddressId = data[0].id ?? null;
        } else {
          this.showAddressForm = true;
        }
      }
    });
  }

  loadCart() {
    this.cartService.getCart().subscribe(data => {
      this.cartItems = data.items;
      this.grandTotal = data.totalAmount;
    });
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }

  saveAddress() {
    this.addressService.saveAddress(this.newAddress)
      .subscribe((saved: any) => {

        this.addresses.push(saved);
        this.selectedAddressId = saved.id;
        this.showAddressForm = false;

        this.newAddress = {
          fullName: '',
          mobile: '',
          street: '',
          city: '',
          state: '',
          pincode: ''
        };
      });
  }

  // ✅ UPDATED CONFIRM ORDER
  confirmOrder() {
    if (!this.selectedAddressId) {
      alert("Select address first");
      return;
    }

    this.loading = true;

    this.orderService.createRazorpayOrder({
  addressId: this.selectedAddressId
}).subscribe((response: any) => {

  console.log("Razorpay Response:", response);

  this.openRazorpay(response);

}, error => {
  this.loading = false;
  alert("Order failed");
});
  }

  openRazorpay(orderData: any) {

  console.log("Razorpay Data:", orderData);

  const options = {
    key: 'rzp_live_SLtwvw076h64NN',  // 🔥 PUT YOUR TEST KEY HERE DIRECTLY

    amount: orderData.amount * 100,   // backend sending rupees
    currency: 'INR',

    order_id: orderData.razorpayOrderId,   // 🔥 VERY IMPORTANT

    name: "Durgesh E-Commerce",
    description: "Order Payment",

    handler: (response: any) => {

  console.log("Payment Success:", response);

  const paymentData = {
    razorpayOrderId: response.razorpay_order_id,
    razorpayPaymentId: response.razorpay_payment_id,
    razorpaySignature: response.razorpay_signature
  };

  // 🔥 CALL BACKEND VERIFY API
  this.orderService.verifyPayment(paymentData)
    .subscribe({
      next: (res:any) => {

        alert("Payment Verified & Order Placed Successfully");

        this.router.navigate(['/orders']);

      },
      error: (err) => {
        console.error(err);
        alert("Payment verification failed");
      }
    });

},

    prefill: {
      name: "Customer",
      email: "test@gmail.com",
      contact: "9999999999"
    },

    theme: {
      color: "rgb(51, 153, 204)"
    }
  };

  const rzp = new Razorpay(options);

  rzp.on('payment.failed', function (response: any) {
    alert("Payment Failed");
    console.error(response.error);
  });

  rzp.open();
}


   deleteAddress(id: number) {

  if(confirm("Are you sure you want to delete this address?")){

    this.addressService.deleteAddress(id).subscribe(
      (res:any)=>{
        alert("Address deleted successfully");

        this.loadAddresses(); // reload list
      },
      (error)=>{
        console.log(error);
      }
    );

  }

}
viewOrder(id: number) {
  this.router.navigate(['/order-details', id]);
}

}
