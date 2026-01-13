import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassword {

  private baseUrl = "http://localhost:8081/api/auth/forgot-password";

  constructor(private http: HttpClient) { }

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-otp`, { email: email });
  }
verifyOtp(email: string, otp: string): Observable<any> {
  return this.http.post(this.baseUrl + "/verify-otp", { email, otp }, { responseType: 'text' });
}


resetPassword(email: string, otp: string, newPassword: string) {
  return this.http.post(
    "http://localhost:8081/api/auth/forgot-password/reset-password",
    { email, otp, newPassword },
    { responseType: 'text' }   // VERY IMPORTANT
  );
}

}
