import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        AuthService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } } // Spy setup
      ]
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const result = authGuard.canActivate();
    expect(result).toBeTrue();
  });

  it('should deny access and redirect if user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    const navigateSpy = router.navigate as jasmine.Spy; // Get the spy reference

    const result = authGuard.canActivate();
    
    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/homecontent']);
  });
});
