import { Component, OnInit, ViewChild} from '@angular/core';
import { BooksService } from './books.service';
import { HttpService } from './http.service';
import { Book } from './model';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books:any[]= [];
  selectedBook: Book;
  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(private httpService:HttpService) {
  }

  ngOnInit(){
    this.getBooks();   
  }
  
  getBooks(){
      console.log("Get Books called");
      const that = this;

      this.httpService.fetchTopReads("https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=7f0f22c09d544373bfccc451fa6f76bb").subscribe(  
        (data) => {  
                   this.books = data.results;
                   console.log(this.books);
                   this.books.forEach(function(book,index){
                    console.log(book.isbns[1].isbn10);
                    that.updateCover(book.isbns[1].isbn10,index); 
                   });
                 },
        err  => { console.log(err)},
        ()  =>  { console.log('done loading top reads')}
      );
  }

 updateCover(id,index){
      this.httpService.fetchCover('https://www.googleapis.com/books/v1/volumes?q=isbn:' + id + '&key=AIzaSyCAze_N32MeHmpoh5ZK7_6skpJPf5tVjmw').subscribe(data => { 
          //console.log("Query returned!"+JSON.stringify(data))},
            var img = data.items[0].volumeInfo.imageLinks.thumbnail;
            img = img.replace(/^http:\/\//i, 'https://');
            console.log("Image path:"+img);
            this.books[index].imagePath = img;
       },
              err  => { console.log(err)},
              ()  =>  { console.log('done updating covers')}
                      
 );
 }


 showDetails(book: Book){
    this.selectedBook = book;
    this.sidenav.open();
  }
}
  

