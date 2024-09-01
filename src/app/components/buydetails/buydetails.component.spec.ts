import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  
import { BuydetailsComponent } from './buydetails.component';
import { BookService } from '../../book.service';
import { OrderService } from '../../order.service';

describe('BuydetailsComponent', () => {
  let component: BuydetailsComponent;
  let fixture: ComponentFixture<BuydetailsComponent>;
  let bookService: BookService;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        BuydetailsComponent
      ],
      providers: [
        BookService,
        OrderService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuydetailsComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle order details', () => {
    const order = { _id: 1, orderDate: '2023-08-01' };

    component.toggleOrderDetails(order, new MouseEvent('click'));

    expect(component.selectedOrder).toBe(order);

    component.toggleOrderDetails(order, new MouseEvent('click'));

    expect(component.selectedOrder).toBeNull(); // Expect order details to be closed
  });

  it('should select and close order details', () => {
    const order = { _id: 1, orderDate: '2023-08-01' };

    component.showOrderDetails(order);
    expect(component.selectedOrder).toBe(order);

    component.closeOrderDetails();
    expect(component.selectedOrder).toBeNull();
  });

  it('should return username from localStorage', () => {
    const mockUser = { username: 'testuser' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

    const username = component['getUsername']();

    expect(username).toBe('testuser');
  });

  it('should return empty string if user is not found in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const username = component['getUsername']();

    expect(username).toBe('');
  });
});
