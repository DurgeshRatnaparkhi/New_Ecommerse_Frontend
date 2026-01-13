import { Component } from '@angular/core';
import { AuthService } from '../../../Service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  form = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.form).subscribe({
      next: (res: any) => {

        if (!res || !res.token) {
          alert("Invalid response from server");
          return;
        }

        // Save data
        this.auth.saveToken(res.token);
        localStorage.setItem('name', res.name ?? '');
        localStorage.setItem('role', res.role ?? '');

        // Navigate based on role
        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin/products']); // 👈 Show product UI immediately
        } else {
          this.router.navigate(['/user']);
        }
      },

      error: (err) => {
        console.error("Login Error:", err);
        alert('Login failed: ' + (err.error?.message || err.message));
      }
    });
  }
}
