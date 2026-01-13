import { Component } from '@angular/core';
import { AuthService } from '../../../Service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {


  form = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.form).subscribe({
      next: () => {
        alert('Registered Successfully!');
        this.router.navigate(['/login']);
      },
      error: err => alert('registration failed: ' + err.message)
    });
  }

}

