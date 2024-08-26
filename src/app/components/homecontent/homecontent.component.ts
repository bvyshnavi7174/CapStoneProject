import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homecontent',
  standalone: true,
  imports: [],
  templateUrl: './homecontent.component.html',
  styleUrl: './homecontent.component.css'
})
export class HomecontentComponent {
  constructor(private router: Router) {}

  goToBuyBooks(): void {
    this.router.navigate(['/buy']); 
  }

  goToSellBooks(): void {
    this.router.navigate(['/sell']); 
  }
}
