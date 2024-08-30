import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule if needed
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule if you use reactive forms
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CheckoutComponent } from './checkout.component';
import { CheckoutService } from '../../checkout.service';
import { OrderService } from '../../order.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Add HttpClientTestingModule
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        CheckoutComponent // Import standalone component directly
      ],
      providers: [
        CheckoutService,
        OrderService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
