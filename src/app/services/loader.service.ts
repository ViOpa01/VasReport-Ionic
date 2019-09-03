import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderToShow: any;
  constructor(public loadingController: LoadingController, public toast:ToastController) { }

  async showLoader() {
    this.loaderToShow =  await this.loadingController.create({
      message: 'Please Wait',
      spinner: 'dots',
      // showBackdrop:false
    });

    await this.loaderToShow.present();
  }

   hideLoader() {
     this.loadingController.dismiss(true);
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }

}
