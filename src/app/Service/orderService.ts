import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8081/api/orders';
  private paymentUrl = 'http://localhost:8081/api/payment';

  constructor(private http: HttpClient) {}

  // 🔥 Use this for Razorpay
  createRazorpayOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getMyOrders(): Observable<any> {
  return this.http.get(`${this.baseUrl}/my`);
}
  // Verify Payment After Razorpay Success
  verifyPayment(data: any): Observable<any> {
    return this.http.post(`${this.paymentUrl}/verify`, data);
  }

  // Handle Payment Failure
  paymentFailed(data: any): Observable<any> {
  return this.http.post(`${this.paymentUrl}/failure`, data);
}

  getOrderById(id: number) {
  return this.http.get(`${this.baseUrl}/${id}`);
}

cancelOrder(id: number) {
  return this.http.put(`http://localhost:8081/api/orders/${id}/cancel`, {});
}

getAllOrdersAdmin() {
  return this.http.get("http://localhost:8081/api/orders/admin/orders");
}

updateOrderStatus(id: number, status: string) {
  return this.http.put(
    `http://localhost:8081/api/orders/admin/${id}/status`,
    { status: status }   // ✅ send in body
  );
}

getDashboardStats() {
  return this.http.get('http://localhost:8081/api/orders/admin/dashboard');
}

getOrdersChart() {
  return this.http.get('http://localhost:8081/api/orders/admin/orders-chart');
}
}
  
  