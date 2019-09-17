import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequestModel } from '../model/auth/request/auth.model';
import { Observable, from, throwError } from 'rxjs';
import { LoginResponseModel } from '../model/auth/response/auth.model';
import { Endpoint } from '../common/endpoints'
import { map, catchError } from 'rxjs/operators';
import { Constants } from '../common/constant';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  constructor(private http: HttpClient,
    private storageService: StorageService,
    public jwtHelper: JwtHelperService) { }

  signIn(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post(Endpoint.AUTH.login, loginRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          this.processLogin(data);
          return data;
        }));
  }

  processLogin(response: LoginResponseModel) {
    
    localStorage.setItem(Constants.STORAGE_VARIABLES.TOKEN, response.token);
    // console.log('show the response token', response.token)

  }

  isAuthenticated(): boolean {
    // const login = localStorage.getItem(Constants.STORAGE_VARIABLES.TOKEN)
    if (!this.jwtHelper.isTokenExpired()) {
      return true;
    }
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
