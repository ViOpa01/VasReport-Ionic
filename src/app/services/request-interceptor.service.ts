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
    constructor(
        private storageService: StorageService,
        public errorDialogService: AlertService,
        public loadingController: LoadingController) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token: LoginResponseModel = this.storageService.get<LoginResponseModel>(Constants.STORAGE_VARIABLES.TOKEN);

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.access_token) });
        }



        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        this.showLoader();
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    this.hideLoader();
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                // this.errorDialogService.presentToast(data);
                this.hideLoader();
                return throwError(error);
            }));
    }

    showLoader() {
        this.loaderToShow = this.loadingController.create({
            message: 'Pease Wait',
            spinner: 'dots',
            showBackdrop:false
        }).then((res) => {
            res.present();

            res.onDidDismiss().then((dis) => {
                console.log('Loading dismissed!');
            });
        });
        this.hideLoader();        
    }

    hideLoader() {
        this.loadingController.dismiss(true);
    }
}
