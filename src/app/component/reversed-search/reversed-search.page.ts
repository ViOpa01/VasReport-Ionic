import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reversed-search',
  templateUrl: './reversed-search.page.html',
  styleUrls: ['./reversed-search.page.scss'],
})
export class ReversedSearchPage implements OnInit {
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
  cardRRN:any;
  
  deafaultDateOne: any = new Date().toISOString().split('T')[0];
  deafaultDateTwo : any = new Date().toISOString().split('T')[0]


  productArray: any = ['mtnvtu', 'mtndata', 'glovtu', 'glodata', 'airtelvtu', 'AIRTELPIN', 'withdrawal', 'ETISALAT', 'VTU', 'multichoice',
    'ikedc', 'eedc', 'transfer', 'ekedc', 'kedco', 'startimes', 'ibedc', 'aedc', 'RCN_FUND_TRANSFER', 'PHED'];
    statusArray:any = ['successful', 'failed'];
  constructor( public formBuilder: FormBuilder, public modalCtrl:ModalController) { 
    this.searchForm = formBuilder.group({
      terminalID: ['', Validators.min],
      agentId: ['', Validators.min],
      transRef: ['', Validators.min],
      seqNum: ['', Validators.min],
      start: ['', Validators.min],
      end: ['', Validators.min]
    });
    
  }

  ngOnInit() {
  }

  searchTrans() {
    //start date from the form
    this.start = this.searchForm.value.start.split('-');
    this.start = `${this.start[0]}/${this.start[1]}/${this.start[2]}`

    //end date from the form
    this.end = this.searchForm.value.end.split('-');
    this.end = `${this.end[0]}/${this.end[1]}/${this.end[2]}`
    
    //date range to be passed to the form
    this.range = `${this.start} - ${this.end}`;
    this.payload = {
      "dateRange": this.range,
      "terminalId": this.searchForm.value.terminalId ? this.searchForm.value.terminalId : '',
      "walletId": this.searchForm.value.agentId ? this.searchForm.value.agentId : '',
      "transactionReference": this.searchForm.value.transRef ? this.searchForm.value.transRef : '',
      "sequenceNumber": this.searchForm.value.seqNum ? this.searchForm.value.seqNum : '',
      "product": this.product ? this.product : '',
      "transactionStatus": "",
      "viewPage": "",
      "download": false
    };
    this.modalCtrl.dismiss(this.payload);
  }

  startDate(event) {
    this.start = event.detail.value.split('T')[0].split('-');
    console.log('start Date : ' + this.start);
  }

  endDate(event) {
    this.end = event.detail.value.split('T')[0];
    console.log('End Date : ' + this.end);
  }


  getProduct(event) {
    this.product = event.detail.value;
    console.log(this.product);

  }

}
