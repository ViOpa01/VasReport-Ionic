import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, NavController, IonRouterOutlet } from '@ionic/angular';
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

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    public loader: LoaderService,
    public authenticationService: AuthService,
    public navController: NavController,
    private router: Router,
  ) {
   
    this.initializeApp();
    this.checkNetwork();
    this.backButtonEvent();

  }

  ngOnInit() { }


  backButtonEvent() {
    document.addEventListener("backbutton", () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }else if(this.router.url === "tabs/tab1"){
          navigator['app'].exitApp(); // work for ionic 4
        } else if (!outlet.canGoBack()) {
          navigator['app'].exitApp(); // work for ionic 4
        }
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkAuth();
      this.initializeStatusBar();
      this.splashScreen.hide();
    });
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
