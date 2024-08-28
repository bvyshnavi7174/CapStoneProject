import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard check'); 
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      alert('You need to be logged in to access this page.'); 
      this.router.navigate(['/homecontent']); 
      return false; 
    }
  }

}