import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Book } from '../../book.service'; // Import the Book interface
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

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

  constructor(private checkoutService: CheckoutService) {}

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
    alert('Payment is successfully done');
    // Optionally, you can clear the cart or redirect to another page here
    this.checkoutService.clearCart(); // Assuming you have a method to clear the cart
    this.updateCart(); // Update the cart display
  }
}
