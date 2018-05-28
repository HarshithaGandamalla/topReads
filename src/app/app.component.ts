import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from './http.service';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books:any[]= [];
  selectedBook: any;
  panelOpenState: boolean = false;
  nytApiKey = '7f0f22c09d544373bfccc451fa6f76bb';
  googleApiKey = 'AIzaSyCAze_N32MeHmpoh5ZK7_6skpJPf5tVjmw'; 
  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(private httpService:HttpService) {
  }

  ngOnInit(){
    this.getBooks();   
  }
  
  getBooks(){
      console.log("Get Books called");
      const that = this;

      this.httpService.fetchTopReads('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key='+this.nytApiKey).subscribe(  
        (data) => {  
                   this.books = data.results;
                   this.books.length=12;
                   this.books.forEach(function(book,index){
                   that.updateCover(book.isbns[1].isbn10,index); 
                   });
                 },
        err  => { console.log(err)},
        ()  =>  { console.log('done loading top reads')}
      );
  }

 updateCover(id,index){
      this.httpService.fetchCover('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ id + '&key='+this.googleApiKey).subscribe(data => { 
            var img = data.items[0].volumeInfo.imageLinks.thumbnail;
            img = img.replace(/^http:\/\//i, 'https://');
            this.books[index].imagePath = img;
            this.books[index].googleDesc = data.items[0].volumeInfo.description;
            this.books[index].buyLink = data.items[0].saleInfo.buyLink;
            this.books[index].sample = data.items[0].accessInfo.webReaderLink;
            this.books[index].price = data.items[0].saleInfo.listPrice;
           },
              err  => { console.log(err)},
              ()  =>  { console.log('done updating covers')}
                      
 );
 }


 showDetails(book: any){
    this.selectedBook = book;
    console.log(JSON.stringify(book));
    this.sidenav.open();
  }
}
  

