import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchModalPage } from '../component/search-modal/search-modal.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public modalController:ModalController) {}
  
  async search() {
    const modal = await this.modalController.create({
      component: SearchModalPage,
      cssClass:'select-modal'
    });
    return await modal.present();
  }
}
