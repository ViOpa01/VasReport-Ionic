import { Injectable, ViewChildren, QueryList } from '@angular/core';
import { LoadingController, ToastController, AlertController, ModalController, MenuController, ActionSheetController, PopoverController, Platform, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  loaderToShow: any;
  constructor(
    public loadingController: LoadingController,
    public toast: ToastController,
    public alertController: AlertController,
    public platform: Platform,
    public modalCtrl: ModalController,
    private router: Router,
  ) { }

  async showLoader() {
    this.loaderToShow = await this.loadingController.create({
      message: 'Please Wait',
      spinner: 'dots',
      // showBackdrop:false
    });

    await this.loaderToShow.present();
  }

  async hideLoader() {
    await this.loadingController.dismiss(true);
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }
  async showAlert(message, onYesHandler) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: onYesHandler
        }
      ]
    });

    await alert.present();
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999999999999999, async () => {
      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);

      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();

        } else if (this.router.url === '/tabs/tab1') {
          this.presentToast('Exit App?')
          navigator['app'].exitApp(); // work in ionic 4
        }
      });
    });
  }
}
