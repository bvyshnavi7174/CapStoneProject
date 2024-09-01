import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { SelldetailsComponent } from './selldetails.component';
import { BookService } from '../../book.service';

describe('SelldetailsComponent', () => {
  let component: SelldetailsComponent;
  let fixture: ComponentFixture<SelldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, // Add HttpClientModule here
        SelldetailsComponent
      ],
      providers: [
        BookService // Add BookService if needed
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
