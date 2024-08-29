import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Book } from '../../book.service'; // Import the Book interface
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: { book: Book, quantity: number }[] = []; // Array to hold cart items
  totalPrice: number = 0;

  constructor(private checkoutService: CheckoutService, private orderService: OrderService) {}

  ngOnInit() {
    this.cartItems = this.checkoutService.getCartItems(); // Fetch cart items
    this.totalPrice = this.checkoutService.getTotalPrice(); // Get total price
  }

  increaseQuantity(book: Book) {
    this.checkoutService.addToCart(book);
    this.updateCart();
  }

  decreaseQuantity(book: Book) {
    this.checkoutService.removeFromCart(book);
    this.updateCart();
  }

  private updateCart() {
    this.cartItems = this.checkoutService.getCartItems();
    this.totalPrice = this.checkoutService.getTotalPrice();
  }

  pay() {
    this.orderService.placeOrder(this.cartItems).subscribe(response => {
      console.log('Order placed successfully:', response);
      this.checkoutService.clearCart(); // Clear cart after successful order
    }, error => {
      console.error('Error placing order:', error);
    });
  }}
