import { Component, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  // This property will save the callback which we can unsubscribe when we leave this view
  public unsubscribeBackEvent: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    private toast: ToastController,
    private router: Router,
    public generic: LoaderService
  ) {
    this.initializeApp();
    this.checkNetwork();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
      }
      this.splashScreen.hide();
    });
  }

  async  onYesHandler() {
    return await navigator['app'].exitApp();
  }


  //Called when view is left
  ionViewWillLeave() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
        // console.log(this.router.url);
        this.presentToast('current Url' + this.router.url);
      } else if (this.router.url === '/login') {
        // or if that doesn't work, try
        navigator['app'].exitApp();
      } else {
        this.presentToast('Did you want to exit the app ?');
      }
    });
  }


  checkNetwork() {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.presentToast('network was disconnected :-(');
      // console.log('network was disconnected :-(');
    });

    this.network.onConnect().subscribe(() => {
      // console.log('network connected!');
      // this.presentToast('network connected :-(');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          // console.log('we got a wifi connection, woohoo!');
          // this.presentToast('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
