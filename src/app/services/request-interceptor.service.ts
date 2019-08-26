import { Injectable, Injector } from "@angular/core";
import {
    HttpErrorResponse,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
    HttpUserEvent,
    HttpEvent
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError, from } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Constants } from "../common/constant";
import { LoginResponseModel } from "../model/auth/response/auth.model";
import { StorageService } from "./storage.service";
import { AlertService } from '../services/alert.service';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    loaderToShow: any;
    constructor(private storageService: StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN);

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            request = request.clone({ headers: request.headers.set('token' , `${token}`) });
            console.log(`token value ${token}`);
        }



        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        //start loading page with preloader
        // this.showLoader();
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    //end loading page with preloader if successful
                    // this.hideLoader();
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // console.log(error);
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                // this.errorDialogService.presentToast(data);
                //end loading page with preloader if failed
                // this.hideLoader();
                return throwError(error);
            }));
    }
}
