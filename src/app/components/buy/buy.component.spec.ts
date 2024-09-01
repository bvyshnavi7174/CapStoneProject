import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BuyComponent } from './buy.component';
import { BookService } from '../../book.service';
import { CheckoutService } from '../../checkout.service';
import { Book } from '../../book.service';

describe('BuyComponent', () => {
  let component: BuyComponent;
  let fixture: ComponentFixture<BuyComponent>;
  let bookService: BookService;
  let checkoutService: CheckoutService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BuyComponent
      ],
      providers: [
        BookService,
        CheckoutService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    checkoutService = TestBed.inject(CheckoutService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the BuyComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should checkout books, clear cart, and navigate to home', () => {
    spyOn(checkoutService, 'checkoutBooks').and.returnValue(of(null));
    spyOn(checkoutService, 'clearCart').and.stub();
    spyOn(window, 'alert').and.stub();

    component.checkout();
    
    expect(checkoutService.checkoutBooks).toHaveBeenCalled();
    expect(checkoutService.clearCart).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(window.alert).toHaveBeenCalledWith('Payment is successfully done');
  });

 
});
