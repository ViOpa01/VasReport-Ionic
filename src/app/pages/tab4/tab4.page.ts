import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public nav:NavController) { }

  ngOnInit() {
  }

  logOut(){
    localStorage.removeItem('TOKEN');
    this.nav.navigateRoot(['/login']);
  }
}
