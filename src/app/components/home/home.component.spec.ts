import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Add RouterTestingModule to handle routing
        HomeComponent // Import standalone component directly
      ],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { params: of({}) } // Mock ActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
