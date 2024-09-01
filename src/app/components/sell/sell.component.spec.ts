import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SellComponent } from './sell.component';
import { BookService } from '../../book.service';
import { of, throwError } from 'rxjs';

describe('SellComponent', () => {
  let component: SellComponent;
  let fixture: ComponentFixture<SellComponent>;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Include HttpClientTestingModule
        SellComponent // Import the standalone SellComponent
      ],
      providers: [BookService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should create the SellComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data from local storage on init', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com', username: 'TestUser' }));
    component.ngOnInit();
    expect(component.currentUserEmail).toBe('test@example.com');
    expect(component.currentUserName).toBe('TestUser');
  });

  it('should load books from the BookService', () => {
    const books = [{ bookName: 'Book 1', bookImage: '', price: 10, rating: 5, review: 'Excellent' }];
    spyOn(bookService, 'getBooks').and.returnValue(of(books));

    component.loadBooks();

    expect(component.books).toEqual(books);
  });

  it('should handle error when loading books', () => {
    spyOn(bookService, 'getBooks').and.returnValue(throwError('Error'));

    component.loadBooks();

    expect(component.books).toEqual([]);
  });

});
