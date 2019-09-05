import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequestModel } from '../model/auth/request/auth.model';
import { Observable, from , throwError} from 'rxjs';
import { LoginResponseModel } from '../model/auth/response/auth.model';
import { Endpoint } from '../common/endpoints'
import { map, catchError } from 'rxjs/operators';
import { Constants } from '../common/constant';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  constructor(private http: HttpClient,
    private storageService: StorageService) { }

  signIn(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post(Endpoint.AUTH.login, loginRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          // console.log(data.token)
          this.processLogin(data);
          return data;
      }), catchError(error => {
          // console.log(error);
          return throwError(error.message);
        }));
  }

  processLogin(response: LoginResponseModel) {
    this.storageService.set(Constants.STORAGE_VARIABLES.TOKEN, response.token);
    console.log('show the response token', response.token)
    
  }

  isAuthenticated(): boolean {
    if (!this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN)) {
      return false;
    }

    const login = this.storageService.get<LoginResponseModel>(Constants.STORAGE_VARIABLES.TOKEN);
    if (login.token && login.is_admin) {
      // var expireInDate = new Date(login.expires_at);
      // return expireInDate > (new Date());
    }

    return true;
  }

  signOut() {
    return this.http.get(Endpoint.AUTH.logout)
      .pipe(map(data => {
        this.storageService.clear(Constants.STORAGE_VARIABLES.TOKEN);
        return data;
      },
        error => {
          console.log(`error ${error}`);
        }
      ));
  }
}
