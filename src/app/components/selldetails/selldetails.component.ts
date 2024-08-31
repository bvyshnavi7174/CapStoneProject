import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selldetails',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './selldetails.component.html',
  styleUrls: ['./selldetails.component.css']
})
export class SelldetailsComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const username = this.getUsername();

    this.bookService.getBooksByStatusAndUsername('sell', username).subscribe(
      data => {
        this.books = data.map(book => ({ ...book, showDetails: false }));
      },
      error => {
        console.error('Error fetching books:', error);
      }
    );
  }

  private getUsername(): string {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.username || '';
      } catch (error) {
        console.error('Failed to parse user data from local storage', error);
      }
    }
    return '';
  }

  toggleDetails(book: any) {
    book.showDetails = !book.showDetails; // Toggle the visibility of details
  }
}
