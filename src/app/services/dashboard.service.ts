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
  queryFailed: any[];
  querySuccess: any[];
  constructor(private http: HttpClient, private storage: StorageService, public loader: LoaderService) { }

  summary(date): Observable<any> {

    let responseSuccess = this.http.get(this.requestUrlSuccessful + `${date.toLowerCase()}/successful`);
    let responseFailed = this.http.get(this.requestUrlFailed + `${date.toLowerCase()}/failed`);

    // console.log(responseSuccess)
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([responseSuccess, responseFailed]);
  }


  getTopFive(date, type, arrayLength): Observable<any> {

    this.queryFailed = [];
    this.querySuccess = [];

    arrayLength.forEach(element => {
      let responseSuccess = this.http.get(Endpoint.BASE_URL.base + `${type.toLowerCase()}/${date.toLowerCase()}/${element.toLowerCase()}/successful`);
      let responseFailed = this.http.get(Endpoint.BASE_URL.base + `${type.toLowerCase()}/${date.toLowerCase()}/${element.toLowerCase()}/failed`);
      // console.log(responseSuccess);
      this.querySuccess.push(responseSuccess);
      this.queryFailed.push(responseFailed);
    });

    let queryArray = [this.querySuccess, this.queryFailed];

    console.log(`array to query One: ${queryArray}`);
    // console.log(`array to query Two: ` + this.queryFailed);

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin(queryArray);
  }

}
