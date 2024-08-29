import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from './book.service'; // Adjust this import if necessary

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/order';

  constructor(private http: HttpClient) {}

  private getUserDetails(): { username: string, useremail: string } {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return {
          username: userData.username || '',
          useremail: userData.email || 'default@example.com'
        };
      } catch (error) {
        console.error('Failed to parse user data from local storage', error);
        return { username: '', useremail: 'default@example.com' };
      }
    } else {
      console.warn('No user data found in local storage');
      return { username: '', useremail: 'default@example.com' };
    }
  }

  placeOrder(orderData: { items: { bookName: string; bookImage: string; price: number; quantity: number; }[], cardDetails: { cardNumber: string; expiryDate: string; cvv: string; } }): Observable<any> {
    const { username, useremail } = this.getUserDetails();

    const fullOrderData = {
      items: orderData.items,
      cardDetails: orderData.cardDetails,
      username,
      useremail,
      totalAmount: this.calculateTotalPrice(orderData.items),
      status: 'buy',
      orderDate: new Date().toISOString()  // Add the current date
    };

    console.log('Sending order data:', fullOrderData);

    return this.http.post(`${this.apiUrl}/add`, fullOrderData).pipe(
      catchError(this.handleError('placeOrder'))
    );
  }

  private calculateTotalPrice(cartItems: { bookName: string; bookImage: string; price: number; quantity: number; }[]): number {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
