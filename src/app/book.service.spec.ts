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

});
