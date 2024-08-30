import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users'; // Ensure this matches your Express server address

  constructor(private http: HttpClient) {}

  signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, email, password });
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { username, password }).pipe(
        tap((response: any) => {
            if (response.message === 'User signed in successfully') {
                localStorage.setItem('username', username); // Ensure this line is executed on successful login
                localStorage.setItem('user', JSON.stringify(response.user)); // If you need to store the whole user object
            }
        })
    );
}


  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/username/${username}`);
  }

  updateUserDetails(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${user.username}`, user);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${username}`);
  }
}
