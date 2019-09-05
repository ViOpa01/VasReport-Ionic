import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {
  dateRanges: any;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.dateRanges = new Date();
  }

  getDate(date) {
    let DateObj = new Date();
    if (date == 'today') {
      this.dateRanges = (String)(DateObj.getFullYear() + '/' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '/' + ('0' + DateObj.getDate()).slice(-2));
      console.log('today');
    } else if (date == 'yesterday') {
      this.dateRanges = (String)(DateObj.getFullYear() + '/' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '/' + (DateObj.getDate()-1));
      console.log(this.dateRanges);
    }
    console.log(this.dateRanges);
    
  }

  async openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Date Range',
      canBackwardsSelected: true,
      // defaultDateRange: 
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date = event.data;
    const from: CalendarResult = date.from;
    const to: CalendarResult = date.to;

    console.log(date, from.string, '-', to.string);
  }
}
