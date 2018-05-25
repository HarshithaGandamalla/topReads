import { Component } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  books: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(){
    this.books = this.booksService.getAll();
  }
}
