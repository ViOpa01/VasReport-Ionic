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
  ) { }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Downloading ...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

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


}
