import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homecontent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './homecontent.component.html',
  styleUrls: ['./homecontent.component.css']  // Changed from `styleUrl` to `styleUrls`
})
export class HomecontentComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserStatus();
  }

  goToBuyBooks(): void {
    this.router.navigate(['/buy']); 
  }

  goToSellBooks(): void {
    this.router.navigate(['/sell']); 
  }

  private checkUserStatus(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isLoggedIn = !!user.username;
    this.isAdmin = user.role === 'admin';
  }
}
