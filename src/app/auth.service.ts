import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, email, password });
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { username, password })
      .pipe(
        map(response => {
          localStorage.setItem('user', JSON.stringify(response));
          return response;
        }),
        catchError(error => {
          console.error('Sign in error:', error);
          return of(null);
        })
      );
  }

  signOut(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }
}
