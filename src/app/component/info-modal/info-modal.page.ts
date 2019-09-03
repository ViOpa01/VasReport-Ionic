import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  name : any;
  sequence : any;
  category : any;
  nairaAmount : any;
  status : any;
  message : any;

  constructor(public navParams:NavParams) { 
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

}
