import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-reverse-modal',
  templateUrl: './reverse-modal.page.html',
  styleUrls: ['./reverse-modal.page.scss'],
})
export class ReverseModalPage implements OnInit {
  channel: any;
  sequence: any;
  reference: any;
  amount: any;
  status: any;
  terminalId: any;
  wallet: any;
  product:any;
  date:any;
  
  constructor(public modalCtrl: ModalController, public navParams: NavParams, ) { 
    this.channel = navParams.get('channel');
    this.sequence = navParams.get('sequence');
    this.reference = navParams.get('reference');
    this.amount = navParams.get('amount');
    this.status = navParams.get('status');
    this.terminalId = navParams.get('terminalId');
    this.wallet = navParams.get('wallet');
    this.product = navParams.get('product');
    this.amount = navParams.get('amount');
    this.date = navParams.get('date');
    

  }

  ngOnInit() {
  }
  closeReversedModal() {
    this.modalCtrl.dismiss(true)

  }
}
