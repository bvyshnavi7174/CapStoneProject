import { Component } from '@angular/core';
import { OrderService } from '../../order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-buydetails',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buydetails.component.html',
  styleUrls: ['./buydetails.component.css']
})
export class BuydetailsComponent {
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
      this.orderService.getAllOrders().subscribe(
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


  

openOrderDetails(order: any): void {
  this.selectedOrder = order;
}





toggleOrderDetails(order: any, event: MouseEvent): void {
  // Close the currently open order details if any
  if (this.selectedOrder && this.selectedOrder._id === order._id) {
    this.selectedOrder = null;
  } else {
    this.selectedOrder = order;
  }
}

isSelectedOrder(order: any): boolean {
  return this.selectedOrder && this.selectedOrder._id === order._id;
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