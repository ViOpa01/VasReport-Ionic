import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReversedService {

  constructor(private http:HttpClient) { }
  
  getReversedTransactions(transModel, page):Observable<any> {
    return this.http.post(Endpoint.REVERSED.REVERSED+`?page=${page}`, transModel).pipe(
      map( data => {
        return data;
      }, error => {
        console.log('there is a error getting data ' + error.message);
      })
    )
  }
}
