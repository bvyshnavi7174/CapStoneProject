import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Book {
  _id?: string;
  bookName: string;
  bookImage: string;
  price: number;
  rating: number;
  review: string;
  date?: string;
  status?: string;
  username?: string;
  useremail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5000/api/books';

  constructor(private http: HttpClient) { }

  getBooks(username?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (username) {
      params = params.set('username', username);
    }
    return this.http.get<Book[]>(this.apiUrl, { params });
  }
  
  getBooksByUsername(username: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/user/${username}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook(book: Book): Observable<Book> {
    if (!book._id) {
      throw new Error('Book ID is required for updating a book.');
    }
    const url = `${this.apiUrl}/${book._id}`;
    return this.http.put<Book>(url, book).pipe(
      catchError(this.handleError<Book>('updateBook'))
    );
  }

  deleteBook(id: string): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<{}>(url).pipe(
      catchError(this.handleError<{}>('deleteBook'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  getBooksByStatusAndUsername(status: string, username: string): Observable<Book[]> {
    const params = new HttpParams().set('status', status).set('username', username);
    return this.http.get<Book[]>(this.apiUrl, { params }).pipe(
      catchError(this.handleError<Book[]>('getBooksByStatusAndUsername', []))
    );
  }
}
