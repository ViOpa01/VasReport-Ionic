import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {

  payload: any;
  start: any;
  end: any;
  range: any;

  searchForm: FormGroup;
  //form Properties

  transactionChannel: any;
  transactionType: any;
  product: any;
  paymentMethod: any;
  vendor: any;
  vendorType: any;
  filter: any;
  filterValue: any;

  transactionReference: any;
  sequenceNumber: any
  debitReference: any;
  accountNumber: any;
  phoneNumber: any;
  terminalId: any;
  walletId: any;
  
  deafaultDate: any = new Date().toISOString().split('T')[0]
  productArray: any = ['mtnvtu', 'mtndata', 'glovtu', 'glodata', 'airtelvtu', 'AIRTELPIN', 'withdrawal', 'ETISALAT', 'VTU', 'multichoice',
    'ikedc', 'eedc', 'transfer', 'ekedc', 'kedco', 'startimes', 'ibedc', 'aedc', 'RCN_FUND_TRANSFER', 'PHED'];

  channelArray: any = ['POS', 'WEB', 'ANDROID', 'ANDROIDPOS', 'ATM', 'DEFAULT', 'OTHERS'];
  paymentMethodArray: any = ['CARD', 'MCARD', 'CASH'];
  TypeArray: any = ['postpaid', 'prepaid', 'smartcard', 'token', 'nonenergy'];
  vendorTypeArray: any = ['B2B', 'ITEX'];
  vendorArray: any = ['gisolutions', 'Karosealliance', 'ITEX', 'Payant', 'NowNow', 'MarsKonnect', 'FCube', 'XchangeBox', 'Daphty', 'Greystone', 'Callphone'];
  filterArray: any = ['cardRRN','transactionReference', 'sequenceNumber', 'debitReference', 'terminalId', 'walletId', 'accountNumber', 'phoneNumber'];

  constructor(public modalCtrl: ModalController, public transService: TransactionService, public formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      filter: ['', Validators.min],
    });
  }

  ngOnInit() {

  }
  searchTrans() {
    this.range = `${this.start} - ${this.end}`;
    if(this.range = undefined){
      console.log('no date');
      
    }
    console.log(this.range);
    this.payload = {
      "dateRange": this.range,
      "terminalId": this.terminalId ? this.terminalId : '',
      "walletId": this.walletId ? this.walletId : '',
      "accountNumber": this.accountNumber ? this.accountNumber : '',
      "paymentMethod": this.paymentMethod ? this.paymentMethod : '',
      "cardRRN": "",
      "transactionReference": this.transactionReference ? this.transactionReference : '',
      "phoneNumber": this.phoneNumber ? this.phoneNumber : '',
      "sequenceNumber": this.sequenceNumber ? this.sequenceNumber : '',
      "debitReference": this.debitReference ? this.debitReference : '',
      "product": this.product ? this.product : '',
      "transactionType": this.transactionType ? this.transactionType : '',
      "transactionStatus": "",
      "transactionChannel": this.transactionChannel ? this.transactionChannel : '',
      "searchField": "",
      "viewPage": "",
    };

    console.log(this.payload);

    return;
    this.modalCtrl.dismiss(this.payload);
  }

  startDate(event) {
    this.start = event.detail.value.split('T')[0].split('-');
    this.start = `${this.start[0]}/${this.start[1]}/${this.start[2]}`;
    console.log('start Date : ' + this.start);
  }

  endDate(event) {
    this.end = event.detail.value.split('T')[0].split('-');
    this.end = `${this.end[0]}/${this.end[1]}/${this.end[2]}`
    console.log('End Date : ' + this.end);
  }

  getChannel(event) {
    this.transactionChannel = event.detail.value;
    console.log(this.transactionChannel);

  }

  getProduct(event) {
    this.product = event.detail.value;
    console.log(this.product);

  }

  getType(event) {
    this.transactionType = event.detail.value;
    console.log(this.transactionType);

  }

  getMethod(event) {
    this.transactionType = event.detail.value;
    console.log(this.transactionType);

  }

  getVendor(event) {
    this.vendor = event.detail.value;
    console.log(this.vendor);
  }

  getVendorType(event) {
    this.vendorType = event.detail.value;
    console.log(this.vendorType);
  }

  getFilter(event) {
    this.filter = event.detail.value;
    this.filterValue = this.searchForm.value.filter
    if (this.filter == 'sequenceNumber') {
      this.sequenceNumber = this.filterValue;
      // console.log('yes seq = ', this.filterValue);
    } else if (this.filter == 'transactionReference') {
      this.transactionReference = this.filterValue;
      // console.log('yes trans', this.filterValue);
    } else if (this.filter == 'debitReference') {
      this.debitReference = this.filterValue;
      // console.log('yes refe', this.filterValue);
    } else if (this.filter == 'terminalId') {
      this.terminalId = this.filterValue;
      // console.log('yes terminal', this.filterValue);
    } else if (this.filter == 'walletId') {
      this.walletId = this.filterValue;
      // console.log('yes walle', this.filterValue);
    } else if (this.filter == 'accountNumber') {
      this.accountNumber = this.filterValue;
      // console.log('yes acct', this.filterValue);
    } else if (this.filter == 'phoneNumber') {
      this.phoneNumber = this.filterValue;
      // console.log('yes num', this.filterValue);
    }

  }
}
