import { Component } from '@angular/core';
import { ForgotPassword } from '../../../Service/forgot-password';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {

  form!: FormGroup;
  message = "";

  constructor(
    private fb: FormBuilder,
    private forgotService: ForgotPassword,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendOtp() {
  if (this.form.invalid) {
    this.message = "Email is required";
    this.form.get('email')?.markAsTouched();
    return;
  }

  const email = this.form.value.email;

  this.forgotService.sendOtp(email).subscribe({
    next: (res: any) => {
      this.message = res.message;
      localStorage.setItem("resetEmail", email);
      this.router.navigate(['/verify-otp']);
    },
    error: () => {
      this.message = "Something went wrong";
    }
  });
  }}
