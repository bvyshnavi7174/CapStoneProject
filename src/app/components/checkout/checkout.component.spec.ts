import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckoutComponent } from './checkout.component';
import { CheckoutService } from '../../checkout.service';
import { OrderService } from '../../order.service';
import { Book } from '../../book.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let checkoutService: CheckoutService;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        CheckoutComponent
      ],
      providers: [
        CheckoutService,
        OrderService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutService);
    fixture.detectChanges();
  });

  it('should create the CheckoutComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart items and total price on ngOnInit', () => {
    const cartItems = [
      { book: { bookName: 'Book 1', bookImage: '', price: 10 } as Book, quantity: 1, showDetails: false },
      { book: { bookName: 'Book 2', bookImage: '', price: 20 } as Book, quantity: 2, showDetails: false }
    ];
    spyOn(checkoutService, 'getCartItems').and.returnValue(cartItems);
    spyOn(checkoutService, 'getTotalPrice').and.returnValue(50);

    component.ngOnInit();

    expect(component.cartItems).toEqual(cartItems);
    expect(component.totalPrice).toBe(50);
  });


  it('should toggle details visibility', () => {
    const item = { book: { bookName: 'Book 1', bookImage: '', price: 10 } as Book, quantity: 1, showDetails: false };
    component.toggleDetails(item);
    expect(item.showDetails).toBe(true);

    component.toggleDetails(item);
    expect(item.showDetails).toBe(false);
  });

  it('should proceed to payment', () => {
    component.proceedToPayment();
    expect(component.showPaymentForm).toBe(true);
  });

  
  
});
