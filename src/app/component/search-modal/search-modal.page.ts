import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {
  transForm: FormGroup;
  start = new Date().toISOString();
  end = new Date().toISOString();
  constructor(public modalController: ModalController, public FormBuilder: FormBuilder) {
    this.transForm = FormBuilder.group({
      type: ['', Validators.compose([Validators.required])],
      start: ['', Validators.compose([Validators.required])],
      end: ['', Validators.compose([Validators.required])],
    });    
  }

  dateChangeStart(date) {
    this.start = date.detail.value;
    // console.log(date.detail.value);
    console.log(this.transForm.value.start);

  }
  dateChangeEnd(date) {
    this.end = date.detail.value;
    // console.log(date.detail.value);
    console.log(this.transForm.value.end);

  }
  ngOnInit() {
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  logForm() {

  }

  // startDate(){
  //   this.datePicker.show({
  //     date: new Date(),
  //     mode: 'date',
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  //   }).then(
  //     date => console.log('Got date: ', date),
  //     err => console.log('Error occurred while getting date: ', err)
  //   );
  // }
}
 