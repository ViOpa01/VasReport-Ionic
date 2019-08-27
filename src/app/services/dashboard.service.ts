import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, throwError, forkJoin } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map, catchError } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  requestUrlSuccessful = Endpoint.SUMMARY.successful;
  requestUrlFailed = Endpoint.SUMMARY.failed;
  
  constructor(private http: HttpClient, private storage: StorageService, public loader:LoaderService) { }

  summary(date): Observable<any> {
    
    let responseSuccess = this.http.get(this.requestUrlSuccessful+`${date.toLowerCase()}/successful`);
    let responseFailed = this.http.get(this.requestUrlFailed+`${date.toLowerCase()}/failed`);
    
    console.log(responseSuccess)
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([responseSuccess, responseFailed]);
  }

  channels(): Observable<any> {
    this.loader.showLoader();
    return this.http.get(Endpoint.SUMMARY.successful,
      {
        headers: {
          'Content-Type': 'application/json',

        }
      }).pipe(
        map(data => {
          // console.log('This is my data', data)
          //hide loader and display the data
          this.loader.hideLoader();
          return data;
        }), catchError(error => {
          console.log(error);
          //if there is error fetching the data close the loader
          this.loader.hideLoader();
          return throwError(error.message);

        }));
  }

  product(): Observable<any> {
    this.loader.showLoader();
    return this.http.get(Endpoint.SUMMARY.successful,
      {
        headers: {
          'Content-Type': 'application/json',

        }
      }).pipe(
        map(data => {
          // console.log('This is my data', data)
          //hide loader and display the data
          this.loader.hideLoader();
          return data;
        }), catchError(error => {
          console.log(error);
          //if there is error fetching the data close the loader
          this.loader.hideLoader();
          return throwError(error.message);

        }));
  }
  paymentMethod(): Observable<any> {
    this.loader.showLoader();
    return this.http.get(Endpoint.SUMMARY.successful,
      {
        headers: {
          'Content-Type': 'application/json',

        }
      }).pipe(
        map(data => {
          // console.log('This is my data', data)
          //hide loader and display the data
          this.loader.hideLoader();
          return data;
        }), catchError(error => {
          console.log(error);
          //if there is error fetching the data close the loader
          this.loader.hideLoader();
          return throwError(error.message);

        }));
  }

}
