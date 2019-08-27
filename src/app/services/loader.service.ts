import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderToShow: any;
  constructor(public loadingController: LoadingController, public toast:ToastController) { }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Please Wait',
      spinner: 'dots',
      // showBackdrop:false
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
        this.hideLoader();
      });
    });
    this.hideLoader();
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
