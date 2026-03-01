import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Service/orderService';
import { Address } from '../../models/address';
import { CartItem } from '../../models/cart-item';
import { AddressService } from '../../Service/address-service';
import { CartService } from '../../Service/cart-service';


@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  standalone: false,
  styleUrls: ['./order.css'],   // ✅ fixed
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
          this.showAddressForm = true; // auto show form if no address
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

        // reset form
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

  confirmOrder() {
    if (!this.selectedAddressId) {
      alert("Select address first");
      return; 
    }

    this.loading = true;

    this.orderService.placeOrder({
      addressId: this.selectedAddressId
    }).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/orders']);
    });
  }
}