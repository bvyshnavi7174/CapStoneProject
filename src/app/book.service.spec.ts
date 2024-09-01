import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService, Book } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5000/api/books';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure there are no outstanding requests
  });

  it('should retrieve books from the API via GET', () => {
    const mockBooks: Book[] = [
      { _id: '1', bookName: 'Book 1', bookImage: 'image1.jpg', price: 10, rating: 4, review: 'Good' },
      { _id: '2', bookName: 'Book 2', bookImage: 'image2.jpg', price: 15, rating: 5, review: 'Excellent' }
    ];

    service.getBooks().subscribe(books => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks); // Simulate a successful response
  });

  it('should add a book to the API via POST', () => {
    const newBook: Book = { bookName: 'New Book', bookImage: 'newbook.jpg', price: 20, rating: 4, review: 'Nice' };
    const addedBook: Book = { ...newBook, _id: '3' };

    service.addBook(newBook).subscribe(book => {
      expect(book).toEqual(addedBook);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newBook);
    req.flush(addedBook); // Simulate a successful response
  });

  it('should update a book via PUT', () => {
    const updatedBook: Book = { _id: '1', bookName: 'Updated Book', bookImage: 'updatedbook.jpg', price: 25, rating: 5, review: 'Updated Review' };

    service.updateBook(updatedBook).subscribe(book => {
      expect(book).toEqual(updatedBook);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedBook);
    req.flush(updatedBook); // Simulate a successful response
  });

  it('should delete a book via DELETE', () => {
    const bookId = '1';

    service.deleteBook(bookId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${apiUrl}/${bookId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Simulate a successful response
  });

  it('should retrieve books by username', () => {
    const username = 'testuser';
    const mockBooks: Book[] = [
      { _id: '1', bookName: 'Book 1', bookImage: 'image1.jpg', price: 10, rating: 4, review: 'Good', username },
      { _id: '2', bookName: 'Book 2', bookImage: 'image2.jpg', price: 15, rating: 5, review: 'Excellent', username }
    ];

    service.getBooksByUsername(username).subscribe(books => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne(`${apiUrl}/user/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks); // Simulate a successful response
  });

  it('should retrieve books by status and username', () => {
    const status = 'available';
    const username = 'testuser';
    const mockBooks: Book[] = [
      { _id: '1', bookName: 'Book 1', bookImage: 'image1.jpg', price: 10, rating: 4, review: 'Good', status, username },
      { _id: '2', bookName: 'Book 2', bookImage: 'image2.jpg', price: 15, rating: 5, review: 'Excellent', status, username }
    ];

    service.getBooksByStatusAndUsername(status, username).subscribe(books => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne(`${apiUrl}?status=${status}&username=${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks); // Simulate a successful response
  });

});
