import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Use HttpClientTestingModule for mocking HTTP requests
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up a user', () => {
    const mockResponse = { message: 'User signed up successfully' };
    const username = 'testuser';
    const email = 'testuser@example.com';
    const password = 'password';

    service.signUp(username, email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/users/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, email, password });
    req.flush(mockResponse);
  });

  it('should sign in a user', () => {
    const mockResponse = { message: 'User signed in successfully', user: { username: 'testuser' } };
    const username = 'testuser';
    const password = 'password';

    service.signIn(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('username')).toBe(username);
      expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockResponse.user));
    });

    const req = httpMock.expectOne('http://localhost:5000/api/users/signin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });
    req.flush(mockResponse);
  });

  it('should check if user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    expect(service.isLoggedIn()).toBeTrue();

    localStorage.removeItem('user');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should get user details', () => {
    const username = 'testuser';
    const mockUserDetails = { username, email: 'testuser@example.com' };

    service.getUserDetails(username).subscribe(details => {
      expect(details).toEqual(mockUserDetails);
    });

    const req = httpMock.expectOne(`http://localhost:5000/api/users/username/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserDetails);
  });

  it('should update user details', () => {
    const user = { username: 'testuser', email: 'newemail@example.com' };
    const mockResponse = { message: 'User updated successfully' };

    service.updateUserDetails(user).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:5000/api/users/update/${user.username}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(user);
    req.flush(mockResponse);
  });

  it('should delete a user', () => {
    const username = 'testuser';
    const mockResponse = { message: 'User deleted successfully' };

    service.deleteUser(username).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:5000/api/users/delete/${username}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
