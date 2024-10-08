import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menuVisible: boolean = false;
  showSignInModal: boolean = false;
  showSignUpModal: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false; 

  constructor(private authService: AuthService, private router: Router) {
    this.checkLoginStatus();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  openSignInModal() {
    this.showSignInModal = true;
  }

  closeSignInModal() {
    this.showSignInModal = false;
  }

  openSignUpModal() {
    this.showSignUpModal = true;
  }

  closeSignUpModal() {
    this.showSignUpModal = false;
  }

  signUp(username: string, email: string, password: string) {
    this.authService.signUp(username, email, password)
      .subscribe(
        response => {
          console.log('User signed up successfully:', response);
          alert('User signed up successfully!');
          localStorage.setItem('user', JSON.stringify({ username, email }));
          this.isLoggedIn = true;
          this.checkUserRole();
          this.closeSignUpModal();
        },
        error => {
          console.error('Error signing up:', error);
          alert('Error signing up. Please try again.');
        }
      );
  }

  signIn(username: string, password: string) {
    this.authService.signIn(username, password)
      .subscribe(
        response => {
          console.log('User signed in successfully:', response);
  
          if (username === 'vyshnavi' && password === '1234') {
            alert('Admin signed in successfully!');
            localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
          } else {
            alert('User signed in successfully!');
            localStorage.setItem('user', JSON.stringify({ username, role: 'user' }));
          }
  
          this.isLoggedIn = true;
          this.checkUserRole();
          this.closeSignInModal();
        },
        error => {
          console.error('Error signing in:', error);
          alert('Error signing in. Please check your credentials and try again.');
        }
      );
  }
  
  checkUserRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin';
  }
  
  signOut() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    alert('You have been signed out.');
    this.router.navigate(['/homecontent']);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isLoggedIn = !!user.username;
    this.checkUserRole();
  }
}
