import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuydetailsComponent } from './buydetails.component';

describe('BuydetailsComponent', () => {
  let component: BuydetailsComponent;
  let fixture: ComponentFixture<BuydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuydetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
