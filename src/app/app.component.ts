import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any;
  checkLogin: any;
  subscription: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    public loader: LoaderService,
    public authenticationService: AuthService,
    public navController: NavController,
    private router: Router,
    private nav: NavController
  ) {
   
    this.initializeApp();
    this.checkNetwork();
  }

  ngOnInit() { }


  initializeApp() {
    this.platform.ready().then(() => {
      this.checkAuth();
      this.platform.backButton.subscribeWithPriority(1000, () => {
        this.loader.presentToast('back button press');
        if (window.location.pathname == "/tabs/tab1") {
          navigator['app'].exitApp();
        }
      });
      this.initializeStatusBar();
      this.splashScreen.hide();
    });
  }
  private setAndroidBackButtonBehavior(deviceInfo): void {
    if (deviceInfo.is("android")) {
      this.platform.backButton.subscribe(() => {
        if (window.location.pathname == "/tabs/tab1") {
          navigator['app'].exitApp();
        }
      });
    }
  }
  initializeStatusBar() {
    this.statusBar.show();
    this.statusBar.overlaysWebView(false);
    // this.statusBar.backgroundColorByHexString('#000000');
    this.statusBar.styleBlackTranslucent();
  }


  checkAuth() {
    let state = this.authenticationService.isAuthenticated();
    if (state) {
      this.navController.navigateRoot(['/tabs/tab1']);
    } else {
      this.navController.navigateRoot('login')
    }
  }

  checkNetwork() {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.loader.presentToast('Network was disconnected :-(');
    });
  }

}
