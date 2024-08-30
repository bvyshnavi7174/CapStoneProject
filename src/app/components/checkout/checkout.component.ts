import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckoutService } from '../../checkout.service';
import { OrderService } from '../../order.service';
import { Book } from '../../book.service'; // Adjust if necessary

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: { book: Book; quantity: number; showDetails: boolean }[] = [];
  totalPrice: number = 0;
  showPaymentForm: boolean = false;

  payment = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private checkoutService: CheckoutService, private orderService: OrderService) {}

  ngOnInit() {
    this.updateCart(); // Initialize cart items and total price
  }

  increaseQuantity(book: Book) {
    this.checkoutService.addToCart(book);
    this.updateCart();
  }

  decreaseQuantity(book: Book) {
    this.checkoutService.removeFromCart(book);
    this.updateCart();
  }

  removeItem(item: { book: Book; quantity: number }) {
    this.checkoutService.removeFromCart(item.book);
    this.updateCart();
  }

  toggleDetails(item: { book: Book; quantity: number; showDetails: boolean }) {
    item.showDetails = !item.showDetails;
  }

  proceedToPayment() {
    this.showPaymentForm = true;
  }

  onSubmitPayment() {
    if (this.validatePaymentDetails()) {
      this.pay();
    } else {
      console.error('Invalid payment details');
    }
  }

  private validatePaymentDetails(): boolean {
    return !!this.payment.cardNumber && !!this.payment.expiryDate && !!this.payment.cvv;
  }

  private pay() {
    const orderDetails = {
      items: this.cartItems.map(item => ({
        bookName: item.book.bookName,
        bookImage: item.book.bookImage,
        price: item.book.price,
        quantity: item.quantity
      })),
      cardDetails: this.payment
    };

    this.orderService.placeOrder(orderDetails).subscribe(response => {
      console.log('Order placed successfully:', response);
      this.checkoutService.clearCart();
      this.showPaymentForm = false;
    }, error => {
      console.error('Error placing order:', error);
    });
  }

  private updateCart() {
    this.cartItems = this.checkoutService.getCartItems().map(item => ({
      ...item,
      showDetails: false // Ensure details are hidden initially
    }));
    this.totalPrice = this.checkoutService.getTotalPrice();
  }
}
