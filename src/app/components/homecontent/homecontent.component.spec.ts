import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomecontentComponent } from './homecontent.component';

// Mock Router
class RouterMock {
  navigate(commands: any[]) {
    return of(true); // Mock the navigation method
  }
}

describe('HomecontentComponent', () => {
  let component: HomecontentComponent;
  let fixture: ComponentFixture<HomecontentComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecontentComponent],
      providers: [
        { provide: Router, useClass: RouterMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecontentComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user status correctly', () => {
    // Test case for logged-in user with admin role
    localStorage.setItem('user', JSON.stringify({ username: 'testuser', role: 'admin' }));
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.isLoggedIn).toBe(true);
    expect(component.isAdmin).toBe(true);

    // Test case for logged-in user without admin role
    localStorage.setItem('user', JSON.stringify({ username: 'testuser', role: 'user' }));
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.isLoggedIn).toBe(true);
    expect(component.isAdmin).toBe(false);

    // Test case for non-logged-in user
    localStorage.setItem('user', JSON.stringify({}));
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.isLoggedIn).toBe(false);
    expect(component.isAdmin).toBe(false);
  });

  it('should navigate to /buy on goToBuyBooks call', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToBuyBooks();
    expect(navigateSpy).toHaveBeenCalledWith(['/buy']);
  });

  it('should navigate to /sell on goToSellBooks call', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToSellBooks();
    expect(navigateSpy).toHaveBeenCalledWith(['/sell']);
  });
});
