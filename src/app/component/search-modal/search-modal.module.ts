import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchModalPage } from './search-modal.page';
import { CalendarModule } from 'ion2-calendar';

const routes: Routes = [
  {
    path: '',
    component: SearchModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CalendarModule
  ],
  declarations: [SearchModalPage]
})
export class SearchModalPageModule {}
