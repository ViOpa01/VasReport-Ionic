import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ToastController } from '@ionic/angular';
import { Endpoint } from '../common/endpoints';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  isLoading: boolean;
  isData: boolean;
  date: string = 'Day';
  changeColor: number;
  channelHeader: string[];
  channelData: any;

  //response holder for success and  fail 
  responseSuccess: any;
  responseFail: any;


  //response holder for success and  fail count
  successCount: any;
  failCount: any;

  //response holder for success and  fail  amount
  successAmount: any;
  failAmount: any;

  //response holder for success and  fail  percentage
  successPercent: any;
  failPercent: any;

  //second tab button to determin the logic
  second: any;

  //first Tab Data
  firstTabData: any;
  secondTabData: any;
  firstdDate: any;
  secondDate: any;
  secondStyle: any;
  firstStyle: any;

  //total amount and count
  totalAmount: any;
  totalCount: any;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true
  };


  constructor(public dashboardService: DashboardService, private toast: ToastController) { }

  async ngOnInit() {
    await this.defaultData(this.date);
    this.changeColor = 0.3;
    console.log(this.changeColor);
    this.channelHeader = ['Channel', 'Success', 'Fail', 'Total']; 4
    this.channelData = [
      { 'name': 'POS', 'successful': '90K', 'fail': '10K', 'total': '100K' },
      { 'name': 'WEB', 'successful': '90K', 'fail': '10K', 'total': '100K' },
      { 'name': 'MOBILE', 'successful': '90K', 'fail': '10K', 'total': '100K' },
      { 'name': 'ANDROID', 'successful': '90K', 'fail': '10K', 'total': '100K' },
      { 'name': 'ANDROID POS', 'successful': '90K', 'fail': '10K', 'total': '100K' },
    ];
    console.log(this.isData);
  }

  defaultData(date) {
    this.getSummary(date);
  }
  async optionsFn(event) {
    this.date = event;
    if (this.date == 'Day') {

      this.second = 'Yesterday';
      //logic to fetch the data for today and yesterday
      await this.getSummary(this.date.toLowerCase());

    } else if (this.date == 'Week') {
      this.second = 'Last Week';
      //logic to fetch the data for current week and Last Week
      await this.getSummary(this.date.toLowerCase());
    } else if (this.date == 'Month') {
      this.second = 'Last Month';
      //logic to fetch the data for current month  and last month
      await this.getSummary(this.date.toLowerCase());
    }
    console.log(this.second);
  }

  async firstTabClick(event) {
    this.firstdDate = event;
    this.secondStyle = 0;
    this.firstStyle = 1;
    if (event) {
      await this.getSummary(event.toLowerCase());
    }
    if (this.secondDate == null || this.secondDate == undefined) {
      this.secondDate = 'Yesterday';
      // await this.getSummary(this.secondDate.toLowerCase());
    }
    console.log(this.firstdDate);
  }

  async  secondTabClick(event) {
    this.secondDate = event;
    this.secondStyle = 1;
    this.firstStyle = 0;
    if (event) {
      this.secondDate = event.replace(" ", "_").toLowerCase();
      console.log('second Parameter : ' + this.secondDate);
      // await this.getSummary(event.toLowerCase());
    }
    else if (this.secondDate == null || this.secondDate == undefined) {
      this.secondDate = 'Yesterday';
      this.secondDate = this.secondDate.replace(" ", "_");
      console.log('second Parameter : ' + this.secondDate);
      // await this.getSummary(this.secondDate.toLowerCase());
    }

  }
  getSummary(date) {
    this.isLoading = true;
    this.isData = false;
    this.dashboardService.summary(date).subscribe(resposeList => {
      console.log('This is my Response List', resposeList);

      this.isLoading = false;
      this.isData = true;
      this.responseSuccess = resposeList[0];
      this.responseFail = resposeList[1];

      //summary of the data for success and fail
      this.successCount = parseInt(this.responseSuccess.data.count);
      this.failCount = parseInt(this.responseFail.data.count);

      //summary of the data for success and fail
      this.successAmount = parseFloat(this.responseSuccess.data.amount);
      this.failAmount = parseFloat(this.responseFail.data.amount);

      //output response to display
      this.totalCount = (this.successCount + this.failCount);
      this.totalAmount = parseFloat(this.successAmount + this.failAmount);


      //summary of the data for success and fail
      this.successPercent = (this.successCount / this.totalCount);
      this.failPercent = (this.failCount / this.totalCount);


      console.log(`Total Count is: ${(this.totalCount)} and Total Amount ${(this.totalAmount)}`);
      // this.presentToast(this.response);

    }, error => {
      this.isLoading = false;
      this.isData = false;
      console.log('Error now: ' + error.message)
    });
  }


}
