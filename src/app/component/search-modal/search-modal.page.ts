import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';
import { TransactionService } from 'src/app/services/transaction.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {
  dateRanges: any;
  isDataTransaction: boolean;
  isLoadingTransaction: boolean;
  trans: any;
  payload: any;
  page: number = 1;

  newRange: any;
  dateRange: any;

  DateObj = new Date();

  searchForm: FormGroup;
  terminalId: any;
  walletId: any;


  deafaultDate: any =  (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());

  constructor(public modalCtrl: ModalController, public transService: TransactionService, public formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      terminalId: ['', Validators.min],
      walletId: ['', Validators.min],
    });
  }

  ngOnInit() {

  }
  searchTrans() {
    this.payload = {
      "dateRange": this.newRange,
      "terminalId": this.searchForm.value.terminalId,
      "walletId": this.searchForm.value.walletId,
      "accountNumber": "",
      "paymentMethod": "",
      "cardRRN": "",
      "transactionReference": "",
      "phoneNumber": "",
      "sequenceNumber": "",
      "debitReference": "",
      "product": "",
      "transactionType": "",
      "transactionStatus": "",
      "transactionChannel": "",
      "searchField": "",
      "viewPage": "2",
    };
    this.modalCtrl.dismiss(this.payload);
  }
  getDate(date) {

    if (date == 'today') {

      this.dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
      this.newRange = `${this.dateRange} - ${this.dateRange}`;
     
      this.deafaultDate = this.newRange;
    } else if (date == 'yesterday') {
      this.dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + (this.DateObj.getDate() - 1));
      this.newRange = `${this.dateRange} - ${this.dateRange}`;
    }
    console.log('date range' + this.newRange);
  }

  async openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Date Range',
      canBackwardsSelected: true,
      defaultDate: this.deafaultDate
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

    let strFrom = from.string;
    let strTo = to.string;
    let splittedFrom = strFrom.split("-", 3);
    let splittedTo = strTo.split("-", 3);

    this.newRange = `${splittedFrom[0]}/${splittedFrom[1]}/${splittedFrom[2]} - ${splittedTo[0]}/${splittedTo[1]}/${splittedTo[2]}`;

    console.log(this.newRange)
  }


}
