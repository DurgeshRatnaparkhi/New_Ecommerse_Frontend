import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
// This guard checks if a user is authenticated by verifying the presence of a JWT token in local storage before allowing access to certain routes.