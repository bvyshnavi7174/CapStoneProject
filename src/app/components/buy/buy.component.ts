import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Book, BookService } from '../../book.service';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  books: Book[] = [];  // Initialize an empty array for the books
  selectedBook: Book | null = null;  // Book details to show in the overlay

  constructor(
    private bookService: BookService,
    private checkoutService: CheckoutService, // Inject CheckoutService
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data.filter(book => book.status === 'sell');  // Filter books by status
    });
  }

  showDetails(book: Book) {
    this.selectedBook = book;  // Set the selected book to show in the overlay
  }

  closeDetails() {
    this.selectedBook = null;  // Close the details overlay
  }

  addToCart(book: Book) {
    this.checkoutService.addToCart(book); 
  }

  checkout() {
    this.checkoutService.checkoutBooks().subscribe(() => {
      alert('Payment is successfully done');
      this.checkoutService.clearCart(); // Clear the cart after checkout
      this.router.navigate(['/']); // Redirect to home or another page
    });
  }
}
