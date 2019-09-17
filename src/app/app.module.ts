import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { Network } from '@ionic-native/network/ngx';
import { InfoModalPageModule } from './component/info-modal/info-modal.module';
import { SearchModalPageModule } from './component/search-modal/search-modal.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StorageService } from "./services/storage.service";

import { Constants } from './common/constant';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ReverseModalPageModule } from './component/reverse-modal/reverse-modal.module';

export function jwtOptionsFactory(storage: StorageService) {
  return {
    tokenGetter: () => {
      return storage.get(Constants.STORAGE_VARIABLES.TOKEN);
    }
  }
}

const config: SocketIoConfig = { url: 'http://197.253.19.76:8002', options: { query: { "token": "59fj9439ewdi93" }} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    InfoModalPageModule,
    SearchModalPageModule,
    ReverseModalPageModule,
    SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [StorageService]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    RequestInterceptorService,
    Network,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
