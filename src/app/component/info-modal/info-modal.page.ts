import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  name: any;
  sequence: any;
  category: any;
  nairaAmount: any;
  status: any;
  message: any;
  terminalId: any;
  agentId: any;
  phoneNumber: any;
  accountNumber: any;
  address: any;
  billerName: any;
  channel: any;
  providerName: any;
  reference: any;
  authCode: any;
  stan: any;
  RRN: any;

  constructor(public navParams: NavParams, public modalCtrl:ModalController) {
    this.terminalId = navParams.get('terminalId');
    this.agentId = navParams.get('agentId');
    this.phoneNumber = navParams.get('phoneNumber');
    this.accountNumber = navParams.get('accountNumber');
    this.address = navParams.get('address');
    this.billerName = navParams.get('billerName');
    this.channel = navParams.get('channel');
    this.providerName = navParams.get('providerName');

    this.reference = navParams.get('reference');
    this.authCode = navParams.get('authCode');

    this.stan = navParams.get('stan');
    this.RRN = navParams.get('RRN');

    this.name = navParams.get('name');
    this.sequence = navParams.get('sequence');
    this.category = navParams.get('category');
    this.nairaAmount = navParams.get('nairaAmount');
    this.status = navParams.get('status');
    this.message = navParams.get('message');
    // console.log(this.status)
  }

  ngOnInit() {
  }
  closeDetailsModal(){
    console.log('close modal');
    this.modalCtrl.dismiss(true)
    
  }
}
