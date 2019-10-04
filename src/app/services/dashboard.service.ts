import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  requestUrlSuccessful = Endpoint.SUMMARY.successful;
  requestUrlFailed = Endpoint.SUMMARY.failed;
  
  //version 2 url for dashboard
  requestUrlVErsion_V2 = Endpoint.SUMMARY_V2.url;
  queryFailed: any[];
  querySuccess: any[];
  queryArray: any;

  constructor(private http: HttpClient) { }

  summary_V2(date): Observable<any> {

    let dateRange = date.replace(" ", "_");
    let second,  response_V2, previousResponse_V2;
    if (dateRange === 'day' || dateRange === 'yesterday') {
      response_V2 = this.http.get(this.requestUrlVErsion_V2 + `${date.toLowerCase()}`);

      second = 'Yesterday';
      //logic to fetch the data for today and yesterday
      second = second.replace(" ", "_").toLowerCase();
      previousResponse_V2 = this.http.get(this.requestUrlVErsion_V2 +`${second.toLowerCase()}`);

    } else if (dateRange === 'week' || dateRange === 'last_week') {
      console.log('date range value for week ', dateRange);
      response_V2 = this.http.get(this.requestUrlVErsion_V2 + `${date.toLowerCase()}`);

      second = 'Last Week';
      //logic to fetch the data for current week and Last Week
      second = second.replace(" ", "_").toLowerCase();

      previousResponse_V2 = this.http.get(this.requestUrlVErsion_V2 +`last_week`);
      
    } else if (dateRange === 'month' || dateRange == 'last_month') {
    
      response_V2 = this.http.get(this.requestUrlVErsion_V2 + `${date.toLowerCase()}`);

      second = 'Last Month';
      //logic to fetch the data for current month  and last month

      previousResponse_V2 = this.http.get(this.requestUrlVErsion_V2 +`last_month`);
    }

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([response_V2, previousResponse_V2]);
  }

  getTopFiveProduct(date): Observable<any> {
    return this.http.get(Endpoint.TOP5.PRODUCT + date.toLowerCase()).pipe(
      map(data => {
        return data;
      })
    )
  }

  
  getTopFiveChannel(date): Observable<any> {
    return this.http.get(Endpoint.TOP5.CHANNEL+ date.toLowerCase()).pipe(
      map(data => {
        return data;
      })
    )
  }
  
  getTopFivePayment(date): Observable<any> {
    return this.http.get(Endpoint.TOP5.PAYMENT+ date.toLowerCase()).pipe(
      map(data => {
        return data;
      })
    )
  }
}
