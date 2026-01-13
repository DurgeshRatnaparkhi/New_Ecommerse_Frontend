import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }


  // Step 1: Send OTP
  sendOtp(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password/send-otp`, { email });
  }

  // Step 2: Verify OTP
  verifyOtp(email: string, otp: string) {
    return this.http.post(`${this.baseUrl}/forgot-password/verify-otp`, { email, otp });
  }

  // Step 3: Reset Password
  resetPassword(email: string, newPassword: string) {
    return this.http.post(`${this.baseUrl}/forgot-password/reset-password`, {
      email,
      newPassword
    });
  }


  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

