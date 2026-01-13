import { Component } from '@angular/core';
import { ForgotPassword } from '../../../Service/forgot-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: false,
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {

  otp = "";
  message = "";
  email = localStorage.getItem("resetEmail") || "";

  constructor(
    private forgotService: ForgotPassword,
    private router: Router
  ) {}

  verify() {

    this.forgotService.verifyOtp(this.email, this.otp).subscribe({
      next: (res: any) => {

        // Convert object to text
        const responseText = typeof res === "string" ? res : res.message || JSON.stringify(res);

        this.message = responseText;

        // Check correct condition
        if (responseText.toLowerCase().includes("verified")) {
          this.router.navigate(['/reset-password']);
        }
      },
      error: (err) => {
        this.message = err.error || "Invalid OTP";
      }
    });
  }
}
  