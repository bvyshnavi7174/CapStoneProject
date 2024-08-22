import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 menuVisible: boolean = false;
  showSignInModal: boolean = false;
  showSignUpModal: boolean = false;

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
  }
  
  
  



