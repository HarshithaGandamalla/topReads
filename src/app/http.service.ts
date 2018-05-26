import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class HttpService {
   
  private BASE_URL = 'http://localhost:3000/';

  constructor(private http:Http) { }
    
    fetchTopReads(url:string) {
        return this.http.get(url).map(data=>data.json());
    }

}



 