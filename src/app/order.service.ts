import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from './book.service'; // Adjust this import if necessary

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/order'; // Correct API URL

  constructor(private http: HttpClient) {}

  // Example method to get user details (replace with actual implementation)
  private getUserDetails(): { username: string, useremail: string } {
    // Replace this with actual logic to get the current user's details
    return { username: 'actualUsername', useremail: 'actualUserEmail' };
  }

  // Place an order
  placeOrder(cartItems: { book: Book, quantity: number }[]): Observable<any> {
    const { username, useremail } = this.getUserDetails(); // Retrieve actual user details

    const orderData = {
      username,
      useremail,
      items: cartItems.map(item => ({
        bookName: item.book.bookName,
        bookImage: item.book.bookImage,
        price: item.book.price,
        quantity: item.quantity
      })),
      totalAmount: this.calculateTotalPrice(cartItems)
    };

    console.log('Sending order data:', orderData); // Log order data for debugging

    return this.http.post(`${this.apiUrl}/add`, orderData).pipe(
      catchError(this.handleError('placeOrder'))
    );
  }

  // Calculate total price for the order
  private calculateTotalPrice(cartItems: { book: Book, quantity: number }[]): number {
    return cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  }

  // Retrieve orders for a user
  getOrders(useremail: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${useremail}`).pipe(
      catchError(this.handleError('getOrders', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
