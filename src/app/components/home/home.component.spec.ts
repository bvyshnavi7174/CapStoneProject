import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { AuthService } from '../../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Add RouterTestingModule to handle routing
        HttpClientTestingModule, // Use HttpClientTestingModule to mock HTTP requests
        HomeComponent // Import standalone component directly
      ],
      providers: [
        AuthService, // Provide the AuthService
        { 
          provide: ActivatedRoute, 
          useValue: { params: of({}) } // Mock ActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility', () => {
    expect(component.menuVisible).toBeFalse();
    component.toggleMenu();
    expect(component.menuVisible).toBeTrue();
  });

  it('should open and close sign-in modal', () => {
    component.openSignInModal();
    expect(component.showSignInModal).toBeTrue();
    component.closeSignInModal();
    expect(component.showSignInModal).toBeFalse();
  });

  it('should open and close sign-up modal', () => {
    component.openSignUpModal();
    expect(component.showSignUpModal).toBeTrue();
    component.closeSignUpModal();
    expect(component.showSignUpModal).toBeFalse();
  });

  it('should call signUp method and update login status on success', () => {
    const spy = spyOn(authService, 'signUp').and.returnValue(of({}));
    spyOn(localStorage, 'setItem');

    component.signUp('testuser', 'test@test.com', 'password');

    expect(spy).toHaveBeenCalledWith('testuser', 'test@test.com', 'password');
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ username: 'testuser', email: 'test@test.com' }));
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should call signIn method and update login status as user', () => {
    const spy = spyOn(authService, 'signIn').and.returnValue(of({}));
    spyOn(localStorage, 'setItem');

    component.signIn('testuser', 'password');

    expect(spy).toHaveBeenCalledWith('testuser', 'password');
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ username: 'testuser', role: 'user' }));
    expect(component.isLoggedIn).toBeTrue();
    expect(component.isAdmin).toBeFalse();
  });

 

  it('should call signOut and reset login status', () => {
    spyOn(localStorage, 'removeItem');
    const navigateSpy = spyOn(router, 'navigate');

    component.signOut();

    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(component.isLoggedIn).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/homecontent']);
  });

  it('should check login status and set isLoggedIn and isAdmin', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ username: 'testuser', role: 'user' }));

    component.checkLoginStatus();

    expect(component.isLoggedIn).toBeTrue();
    expect(component.isAdmin).toBeFalse();
  });

  it('should navigate to checkout page on goToCheckout', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToCheckout();

    expect(navigateSpy).toHaveBeenCalledWith(['/checkout']);
  });
});
