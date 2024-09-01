import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckoutService } from './checkout.service';
import { Book } from './book.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let httpMock: HttpTestingController;

  const mockBook: Book = {
    bookName: 'Book A',
    bookImage: 'imageA.jpg',
    price: 20,
    rating: 4.5,
    review: 'Great book'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [CheckoutService]
    });

    service = TestBed.inject(CheckoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add items to the cart', () => {
    service.addToCart(mockBook);
    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].book).toEqual(mockBook);
    expect(cartItems[0].quantity).toBe(1);

    service.addToCart(mockBook);
    const updatedCartItems = service.getCartItems();
    expect(updatedCartItems[0].quantity).toBe(2);
  });

  it('should remove items from the cart', () => {
    service.addToCart(mockBook);
    service.removeFromCart(mockBook);
    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(0);
  });

  it('should calculate total price', () => {
    service.addToCart(mockBook);
    service.addToCart(mockBook); // 2 items
    const totalPrice = service.getTotalPrice();
    expect(totalPrice).toBe(40); // 20 * 2
  });

  it('should clear the cart', () => {
    service.addToCart(mockBook);
    service.clearCart();
    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(0);
  });

  it('should checkout books', () => {
    const mockResponse = { message: 'Checkout successful' };
    const mockCart = [{ book: mockBook, quantity: 1 }];
    
    spyOn(service as any, 'getUserDetails').and.returnValue({ username: 'testuser', useremail: 'testuser@example.com' });

    service['cart'] = mockCart; // Directly set cart data for testing

    service.checkoutBooks().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/cart/store');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual([{
      username: 'testuser',
      useremail: 'testuser@example.com',
      bookName: mockBook.bookName,
      bookImage: mockBook.bookImage,
      price: mockBook.price,
      rating: mockBook.rating,
      review: mockBook.review
    }]);
    req.flush(mockResponse);
  });

  it('should handle errors during checkout', () => {
    const mockCart = [{ book: mockBook, quantity: 1 }];
    
    spyOn(service as any, 'getUserDetails').and.returnValue({ username: 'testuser', useremail: 'testuser@example.com' });

    service['cart'] = mockCart; // Directly set cart data for testing

    service.checkoutBooks().subscribe(response => {
      expect(response).toBeUndefined(); // Error handling should result in undefined response
    });

    const req = httpMock.expectOne('http://localhost:5000/api/cart/store');
    expect(req.request.method).toBe('POST');
    req.flush('Failed to checkout', { status: 500, statusText: 'Server Error' });
  });
});
