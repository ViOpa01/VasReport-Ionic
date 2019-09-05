import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../model/tansaction/transaction';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  transModel:Transaction;
  data:any;
  constructor(private  http:HttpClient) { }

  getTransactionsDetails(transModel, page):Observable<any> {
    return this.http.post(Endpoint.TRANSACTION.transaction+`?page=${page}`, transModel).pipe(
      map( data => {
        return data;
      }, error => {
        console.log('there is a error getting data ' + error.message);
      })
    )
  }

  getSummary(transModel):Observable<any>{
    return this.http.post(Endpoint.TRANSACTION_SUMMARY.transaction_summary, transModel).pipe(
      map( data => {
        return data;
      }, error => {
        console.log('There is an error getting Data ):' + error.message)
      })
    );
  }
}
