import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AccountComponent } from './account.component';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Mock AuthService
class AuthServiceMock {
  updateUserDetails(user: any) {
    return of({ success: true }); 
  }

  deleteUser(username: string) {
    return of({ success: true }); 
  }
}

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        AccountComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should handle user data parsing errors', () => {
    spyOn(localStorage, 'getItem').and.returnValue('invalid json');
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLoggedIn).toBe(false);
    expect(component.user).toEqual({ username: '', email: '' });
  });

  it('should sign out the user and redirect to home', () => {
    component.signOut();
    expect(localStorage.getItem('user')).toBeNull();
    expect(component.isLoggedIn).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/homecontent']);
  });



  it('should save the profile and handle success response', () => {
    spyOn(authService, 'updateUserDetails').and.callThrough();
    spyOn(window, 'alert');
    component.user = { username: 'testuser', email: 'updated@example.com' };
    component.saveProfile();
    fixture.detectChanges();

    expect(authService.updateUserDetails).toHaveBeenCalledWith(component.user);
    expect(window.alert).toHaveBeenCalledWith('Profile updated successfully!');
  });

});
