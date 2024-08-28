import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../book.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Book {
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

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  showForm = false;
  book: Book = {
    bookName: '',
    bookImage: '',
    price: 0,
    rating: 0,
    review: ''
  };

  books: Book[] = [];
  editingIndex: number | null = null;

  currentUserEmail: string = ''; // Will be initialized from local storage
  currentUserName: string = '';  // Will be initialized from local storage

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadUserData(); // Fetch user data from local storage
    this.loadBooks();
  }

  loadUserData(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.currentUserEmail = userData.email || '';
      this.currentUserName = userData.username || '';
    }
  }

  loadBooks(): void {
    this.bookService.getBooks(this.currentUserName).pipe(
      catchError(error => {
        console.error('Error loading books', error);
        return of([]); // Return empty array in case of error
      })
    ).subscribe(books => this.books = books);
  }

  onSubmit(): void {
    // Include current user details
    this.book.useremail = this.currentUserEmail;
    this.book.username = this.currentUserName;

    let bookOperation$: Observable<Book>;

    if (this.editingIndex !== null) {
      // Update existing book
      bookOperation$ = this.bookService.updateBook(this.book);
    } else {
      // Add new book
      bookOperation$ = this.bookService.addBook(this.book);
    }

    bookOperation$.pipe(
      catchError(error => {
        console.error('Error saving book', error);
        return of(this.book); // Return the current book object in case of error
      })
    ).subscribe(() => {
      this.loadBooks();  // Refresh the list after add/update
      this.resetForm();
    });
  }

  editBook(index: number): void {
    this.book = { ...this.books[index] };
    this.editingIndex = index;
    this.showForm = true;
  }

  deleteBook(index: number): void {
    const bookId = this.books[index]._id;
    if (bookId) {
      this.bookService.deleteBook(bookId).pipe(
        catchError(error => {
          console.error('Error deleting book', error);
          return of({}); // Return an empty object in case of error
        })
      ).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  private resetForm(): void {
    this.book = {
      bookName: '',
      bookImage: '',
      price: 0,
      rating: 0,
      review: ''
    };
    this.editingIndex = null;
    this.showForm = false;
  }
}
