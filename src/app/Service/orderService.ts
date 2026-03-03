import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8081/api/orders';

  constructor(private http: HttpClient) {}

  // 🔥 Use this for Razorpay
  createRazorpayOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getMyOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/place`);
  }
}