import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceStatusService {
  queryResult: any[];
  responseResult: any;
  private Url = 'http://vas.itexapp.com/service/status/switch';

  constructor(public http: HttpClient, ) { }

  switchServiceStatus(arrayLength): Observable<any> {

    this.queryResult = [];

    arrayLength.forEach(element => {

      this.responseResult = this.http.get(Endpoint.SERVICE_STATUS.SWITCH + `${element.toLowerCase()}`);
      this.queryResult.push(this.responseResult);
    });   

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin(this.queryResult);
  }

  switchAction(payload): Observable<any> {
    return this.http.post(this.Url, payload, {
      headers: {
        'Content-Type': 'Application/json'
      }
    }).pipe(
      map(data => {
        return data;
      }), catchError(error => {
        return throwError(error.message);
      }));
  }
}
