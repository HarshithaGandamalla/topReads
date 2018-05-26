import { Component } from '@angular/core';
import { BooksService } from './books.service';
import { HttpService } from './http.service';
import { Book } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  books:any[]= [];

  constructor(private httpService:HttpService) {
  }

  ngOnInit(){
    this.getBooks();   
  }
  
  getBooks(){
      console.log("Get Books called");
      this.httpService.fetchTopReads("https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=7f0f22c09d544373bfccc451fa6f76bb").subscribe(  
        data => { 
            this.books = data.results;
//            console.log("Fetched books:"+this.books)
        },
        err  => { console.log(err)},
        ()  =>  { console.log('done loading top reads')}
      );
  }
  
}
