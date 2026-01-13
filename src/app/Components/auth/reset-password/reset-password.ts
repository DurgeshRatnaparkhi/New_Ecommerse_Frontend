import { Component } from '@angular/core';
import { ForgotPassword } from '../../../Service/forgot-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

 newPassword = "";
  otp = "";
  email = localStorage.getItem("resetEmail") || "";
  message = "";

  constructor(
    private forgotService: ForgotPassword,
    private router: Router
  ) {}

 reset() {
  this.forgotService.resetPassword(this.email, this.otp, this.newPassword)
    .subscribe({
      next: (res) => {
        if (res === "Password Reset Success") {
          alert("Password reset successfully!");
          this.router.navigate(['/login']);
        } else {
          alert("Something went wrong");
        }
      },
      error: () => {
        alert("Invalid or expired OTP");
      }
    });
}

  
}
