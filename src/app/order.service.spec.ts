import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [OrderService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should place an order', () => {
    const orderData = {
      items: [
        { bookName: 'Book A', bookImage: 'imageA.jpg', price: 10, quantity: 2 },
        { bookName: 'Book B', bookImage: 'imageB.jpg', price: 15, quantity: 1 }
      ],
      cardDetails: { cardNumber: '1234567812345678', expiryDate: '12/24', cvv: '123' }
    };
    const mockResponse = { message: 'Order placed successfully' };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ username: 'testuser', email: 'testuser@example.com' }));

    service.placeOrder(orderData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/order/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      ...orderData,
      username: 'testuser',
      useremail: 'testuser@example.com',
      totalAmount: 35, // Calculated total price
      status: 'buy',
      orderDate: jasmine.any(String) // Expecting a string for the date
    });
    req.flush(mockResponse);
  });

  it('should get orders by username', () => {
    const username = 'testuser';
    const mockOrders = [
      { id: 1, items: [], totalAmount: 100 },
      { id: 2, items: [], totalAmount: 50 }
    ];

    service.getOrdersByUsername(username).subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(`http://localhost:5000/api/order/username/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should get all orders', () => {
    const mockOrders = [
      { id: 1, items: [], totalAmount: 100 },
      { id: 2, items: [], totalAmount: 50 }
    ];

    service.getAllOrders().subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/order/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should handle errors correctly', () => {
    const orderData = {
      items: [
        { bookName: 'Book A', bookImage: 'imageA.jpg', price: 10, quantity: 2 },
        { bookName: 'Book B', bookImage: 'imageB.jpg', price: 15, quantity: 1 }
      ],
      cardDetails: { cardNumber: '1234567812345678', expiryDate: '12/24', cvv: '123' }
    };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ username: 'testuser', email: 'testuser@example.com' }));

    service.placeOrder(orderData).subscribe(response => {
      expect(response).toBeUndefined(); // Error handling should result in undefined response
    });

    const req = httpMock.expectOne('http://localhost:5000/api/order/add');
    expect(req.request.method).toBe('POST');
    req.flush('Failed to place order', { status: 500, statusText: 'Server Error' });
  });
});
