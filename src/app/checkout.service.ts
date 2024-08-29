import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cart: { book: Book, quantity: number }[] = [];
  private apiUrl = 'http://localhost:5000/api/cart'; // Correct API URL

  constructor(private http: HttpClient) {}

  // Example method to get user details (replace with actual implementation)
  private getUserDetails(): { username: string, useremail: string } {
    // Replace this with actual logic to get the current user's details
    return { username: 'actualUsername', useremail: 'actualUserEmail' };
  }

  addToCart(book: Book) {
    const existingItem = this.cart.find(item => item.book.bookName === book.bookName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ book, quantity: 1 });
    }
  }

  removeFromCart(book: Book) {
    const index = this.cart.findIndex(item => item.book.bookName === book.bookName);
    if (index > -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  getCartItems() {
    return this.cart;
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  }

  clearCart() {
    this.cart = [];  // Clear the cart
  }

  // Method to save cart data
  checkoutBooks(): Observable<any> {
    const { username, useremail } = this.getUserDetails(); // Retrieve actual user details

    const cartData = this.cart.map(item => ({
      username,
      useremail,
      bookName: item.book.bookName,
      bookImage: item.book.bookImage,
      price: item.book.price,
      rating: item.book.rating,
      review: item.book.review
    }));

    console.log('Sending cart data:', cartData); // Log cart data for debugging

    return this.http.post(`${this.apiUrl}/store`, cartData).pipe(
      catchError(this.handleError('checkoutBooks'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
