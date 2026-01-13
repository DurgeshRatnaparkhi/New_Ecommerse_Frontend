import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth-service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {


  name = localStorage.getItem('name');
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

}
