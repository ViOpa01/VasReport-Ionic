import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, forkJoin } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  requestUrlSuccessful = Endpoint.SUMMARY.successful;
  requestUrlFailed = Endpoint.SUMMARY.failed;
  queryFailed: any[];
  querySuccess: any[];
  queryArray: any;

  constructor(private http: HttpClient, private storage: StorageService, public loader: LoaderService) { }

  summary(date): Observable<any> {

    let dateRange = date.replace(" ", "_");
    let second, responseSuccess, responseFailed, previousFailed, previousSuccess;
    if (dateRange === 'day' || dateRange === 'yesterday') {
      responseSuccess = this.http.get(this.requestUrlSuccessful + `${date.toLowerCase()}/successful`);
      responseFailed = this.http.get(this.requestUrlFailed + `${date.toLowerCase()}/failed`);

      second = 'Yesterday';
      //logic to fetch the data for today and yesterday
      second = second.replace(" ", "_").toLowerCase();
      previousSuccess = this.http.get(this.requestUrlSuccessful + `${second.toLowerCase()}/successful`);
      previousFailed = this.http.get(this.requestUrlFailed + `${second.toLowerCase()}/failed`);


    } else if (dateRange === 'week' || dateRange === 'last_week') {
      console.log('date range value for week ', dateRange);
      responseSuccess = this.http.get(this.requestUrlSuccessful + `${date.toLowerCase()}/successful`);
      responseFailed = this.http.get(this.requestUrlFailed + `${date.toLowerCase()}/failed`);

      second = 'Last Week';
      //logic to fetch the data for current week and Last Week
      second = second.replace(" ", "_").toLowerCase();

      previousSuccess = this.http.get(this.requestUrlSuccessful + `last_week/successful`);
      previousFailed = this.http.get(this.requestUrlFailed + `last_week/failed`);


    } else if (dateRange === 'month' || dateRange == 'last_month') {
      console.log('date range value for month ', dateRange);

      responseSuccess = this.http.get(this.requestUrlSuccessful + `${date.toLowerCase()}/successful`);
      responseFailed = this.http.get(this.requestUrlFailed + `${date.toLowerCase()}/failed`);

      second = 'Last Month';
      //logic to fetch the data for current month  and last month

      previousSuccess = this.http.get(this.requestUrlSuccessful + `last_month/successful`);
      previousFailed = this.http.get(this.requestUrlFailed + `last_month/failed`);

    }

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([responseSuccess, responseFailed, previousSuccess, previousFailed]);
  }


  getTopFive(date, type, arrayLength): Observable<any> {

    this.queryFailed = [];
    this.querySuccess = [];


    let responseFailed, responseSuccess;
    // const response = Endpoint.BASE_URL.base + `${type.toLowerCase()}/${date.toLowerCase()}/products/successful`;
    // console.log('response URl', response);
    arrayLength.forEach(element => {
      responseSuccess = this.http.get(Endpoint.BASE_URL.base + `${type.toLowerCase()}/${date.toLowerCase()}/${element.toLowerCase()}/successful`);
      responseFailed = this.http.get(Endpoint.BASE_URL.base + `${type.toLowerCase()}/${date.toLowerCase()}/${element.toLowerCase()}/failed`);

      this.querySuccess.push(responseSuccess);
      this.queryFailed.push(responseFailed);
    });

    //concatinate the two array together
    const arr3 = [...this.querySuccess, ...this.queryFailed] //arr3 ==> [1,2,3,4,5,6]
    // console.log('new array value', arr3);

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin(arr3);
  }

}
