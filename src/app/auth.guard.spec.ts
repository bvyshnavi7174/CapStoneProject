import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import the correct class

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        // Mock AuthService and Router if needed
      ]
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    // Mock the AuthService to return true for isLoggedIn
    spyOn(authGuard['authService'], 'isLoggedIn').and.returnValue(true);
    const result = authGuard.canActivate();
    expect(result).toBeTrue();
  });

  it('should deny access and redirect if user is not logged in', () => {
    // Mock the AuthService to return false for isLoggedIn
    spyOn(authGuard['authService'], 'isLoggedIn').and.returnValue(false);
    const navigateSpy = spyOn(authGuard['router'], 'navigate');
    
    const result = authGuard.canActivate();
    
    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/homecontent']);
  });
});
