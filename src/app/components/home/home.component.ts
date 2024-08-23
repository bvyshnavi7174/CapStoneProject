import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule if using HttpClient

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // HttpClientModule can be included here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menuVisible: boolean = false;
  showSignInModal: boolean = false;
  showSignUpModal: boolean = false;

  constructor(private authService: AuthService) {}

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
          alert('User signed up successfully!'); // Show alert box
          this.closeSignUpModal();
        },
        error => {
          console.error('Error signing up:', error);
          alert('Error signing up. Please try again.'); // Show alert box for error
        }
      );
  }

  signIn(username: string, password: string) {
    this.authService.signIn(username, password)
      .subscribe(
        response => {
          console.log('User signed in successfully:', response);
          alert('User signed in successfully!'); // Show alert box
          this.closeSignInModal();
        },
        error => {
          console.error('Error signing in:', error);
          alert('Error signing in. Please check your credentials and try again.'); // Show alert box for error
        }
      );
  }
}
