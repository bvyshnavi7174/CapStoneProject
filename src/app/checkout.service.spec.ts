import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // Add HttpClientTestingModule to handle HTTP requests
    });
    service = TestBed.inject(CheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
