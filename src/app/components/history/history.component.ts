import { Component } from '@angular/core';
import { Book, BookService } from '../../book.service';
import { OrderService } from '../../order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  orders: any[] = [];
  books: any[] = [];
  currentView: 'orders' | 'books' = 'orders';
  selectedOrder: any = null;

  constructor(private bookService: BookService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const username = this.getUsername();
    
    if (this.currentView === 'orders') {
      this.orderService.getOrdersByUsername(username).subscribe(
        data => {
          this.orders = data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
    } else if (this.currentView === 'books') {
      this.bookService.getBooksByStatusAndUsername('sell', username).subscribe(
        data => {
          this.books = data;
        },
        error => {
          console.error('Error fetching books:', error);
        }
      );
    }
  }

  showOrders(): void {
    this.currentView = 'orders';
    this.loadData();
  }

  showBooks(): void {
    this.currentView = 'books';
    this.loadData();
  }

  showOrderDetails(order: any): void {
    this.selectedOrder = order;
  }

  closeOrderDetails(): void {
    this.selectedOrder = null;
  }

  private getUsername(): string {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.username || '';
      } catch (error) {
        console.error('Failed to parse user data from local storage', error);
      }
    }
    return '';
  }
}
