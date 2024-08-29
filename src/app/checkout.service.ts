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
  private apiUrl = 'http://localhost:5000/api/books'; // Assuming the same API for updating book status

  constructor(private http: HttpClient) {}

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

  // New method to update book status
  checkoutBooks(): Observable<any> {
    const checkedOutBooks = this.cart.map(item => ({
      ...item.book,
      status: 'buy'
    }));

    return this.http.put(this.apiUrl + '/update-status', checkedOutBooks).pipe(
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
