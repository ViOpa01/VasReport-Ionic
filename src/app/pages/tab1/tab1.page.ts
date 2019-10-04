import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  //loading and data check for summary
  isLoadingSummary: boolean;
  isDataSummary: boolean;

  //loading and data check for payment
  isLoadingPayment: boolean;
  isDataPayment: boolean;

  //loading and data check for channel
  isLoadingChannel: boolean;
  isDataChannel: boolean;


  //loading and data check for channel
  isLoadingProduct: boolean;
  isDataProduct: boolean;

  date: string = 'Day';

  //headers array for display
  channelHeader: string[];
  productHeader: string[];
  paymentHeader: string[];


  //response holder for success and  fail 
  responseCurrent: any;
  responsePrevious: any;

  previousTotal: any = null;

  //response holder for success and  fail count
  successCountCurrent: any;
  failCountCurrent: any;

  //response holder for success and  fail  amount
  successAmountCurrent: any = null;
  failAmountCurrent: any = null;

  //percentage change
  percentChange: any = null;

  //response holder for success and  fail  percentage
  successPercentCurrent: any;
  failPercentCurrent: any;

  //second tab button to determin the logic
  second: any;

  //first Tab Data
  firstdDate: any;
  secondDate: any;
  secondStyle: any;
  firstStyle: any;

  //total amount and count
  totalAmountCurrent: any;
  totalCountCurrent: any;

  //previous
  isPresent: boolean;

  arraySuccess: any;
  arrayFailed: any;

  outputChannel: any[] = [];
  outputProduct: any[] = [];
  outputProductArray: any[] = [];
  outputPayment: any[] = [];

  //refreh the page after every 15 minutes
  refresh: Subscription;

  sliderConfig = {
    slidesPerView: 1.7,
    spaceBetween: 1,
    centeredSlides: false,
    loop: false
  };


  constructor(public dashboardService: DashboardService) {
  }



  productArray: any = ['mtnvtu', 'mtndata', 'glovtu', 'glodata', 'airtelvtu', 'AIRTELPIN', 'withdrawal', 'ETISALAT', 'VTU', 'multichoice',
    'ikedc', 'eedc', 'transfer', 'ekedc', 'kedco', 'startimes', 'ibedc', 'aedc', 'RCN_FUND_TRANSFER', 'PHED'];

  channelArray: any = ['POS', 'WEB', 'ANDROID', 'ANDROIDPOS', 'ATM', 'DEFAULT', 'OTHERS'];
  paymentMethodArray: any = ['CARD', 'MCARD', 'CASH'];

  ngOnInit() {
    this.defaultData(this.date);
    this.getTopfiveChannel(this.date);
    this.getTopfiveProduct(this.date);
    this.getTopfivePayment(this.date);

    this.channelHeader = ['Channel', 'Success', 'Fail', 'Total'];
    this.productHeader = ['Product', 'Success', 'Fail', 'Total'];
    this.paymentHeader = ['Payment', 'Success', 'Fail', 'Total'];

    this.refresh = interval(15 * 60 * 1000).subscribe(() => {
      this.defaultData(this.date);
      // this.getTopfiveChannel(this.date);
      this.getTopfiveProduct(this.date);
      // this.getTopfivePayment(this.date);

    })
    // console.log(this.productArray.length);
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  defaultData(date) {
    this.isPresent = true;
    this.getSummary(date.toLowerCase());
  }

  async optionsFn(event) {
    this.date = event;
    console.log(this.date)
    this.secondStyle = 0;
    this.firstStyle = 1;
    this.isPresent = true;
    this.previousTotal = null;
    if (this.date == 'Day') {

      this.second = 'Yesterday';
      //logic to fetch the data for today and yesterday
      await this.getSummary(this.date.toLowerCase());
      await this.getTopfiveChannel(this.date);
      await this.getTopfiveProduct(this.date);
      await this.getTopfivePayment(this.date);
    } else if (this.date == 'Week') {
      this.second = 'Last Week';
      //logic to fetch the data for current week and Last Week
      await this.getSummary(this.date.toLowerCase());
      await this.getTopfiveChannel(this.date);
      await this.getTopfiveProduct(this.date);
      await this.getTopfivePayment(this.date);
    } else if (this.date == 'Month') {
      this.second = 'Last Month';
      //logic to fetch the data for current month  and last month
      await this.getSummary(this.date.toLowerCase());
      await this.getTopfiveChannel(this.date);
      await this.getTopfiveProduct(this.date);
      await this.getTopfivePayment(this.date);
    }
    console.log('present : ' + this.isPresent);
  }

  async firstTabClick(event) {
    this.firstdDate = event;
    this.secondStyle = 0;
    this.firstStyle = 1;
    this.isPresent = true;

    if (event) {
      await this.getSummary(event.toLowerCase());
      await this.getTopfiveChannel(this.firstdDate);
      await this.getTopfiveProduct(this.firstdDate);
      await this.getTopfivePayment(this.firstdDate);

    }
    if (this.secondDate == null || this.secondDate == undefined) {
      this.secondDate = 'Yesterday';
      await this.getSummary(this.secondDate.toLowerCase());
      await this.getTopfiveChannel(this.secondDate);
      await this.getTopfiveProduct(this.secondDate);
      await this.getTopfivePayment(this.secondDate);

    }
    console.log('present : ' + this.isPresent);
  }

  async  secondTabClick(event) {
    console.log('second Parameter : ' + event);
    this.secondDate = event;
    this.secondStyle = 1;
    this.firstStyle = 0;
    if (event) {
      this.secondDate = event;
      console.log('second Parameter : ' + this.secondDate);
      await this.getSummary(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfiveChannel(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfiveProduct(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfivePayment(this.secondDate.replace(" ", "_").toLowerCase());

    }
    else if (this.secondDate == null || this.secondDate == undefined) {
      this.secondDate = 'Yesterday';
      await this.getSummary(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfiveChannel(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfiveProduct(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfivePayment(this.secondDate.replace(" ", "_").toLowerCase());

    }
    this.isPresent = false;
  }
  getSummary(date) {
    this.isLoadingSummary = true;
    this.isPresent = true;
    this.isDataSummary = false;
    // let present:boolean = tru
    this.dashboardService.summary_V2(date).subscribe(resposeList => {

      this.isLoadingSummary = false;
      this.isDataSummary = true;
      this.responseCurrent = resposeList[0];
      this.responsePrevious = resposeList[1];

      // console.log(this.responsePrevious);
      
      //summary of the data for success and fail
      this.successCountCurrent = parseInt(this.responseCurrent.data.successfulCount);
      this.failCountCurrent = parseInt(this.responseCurrent.data.failedCount);

      //summary of the data for success and fail
      this.successAmountCurrent = parseFloat(this.responseCurrent.data.successfulAmount);
      this.failAmountCurrent = parseFloat(this.responseCurrent.data.failedAmount);

      //output response to display
      this.totalCountCurrent = this.responseCurrent.data.transactionCount;
      this.totalAmountCurrent = this.responseCurrent.data.totalAmount;


      //summary of the data for success and fail
      this.successPercentCurrent = this.responseCurrent.data.successfulPercent;
      this.failPercentCurrent = this.responseCurrent.data.failedPercent;

      //summary of the data for previous  success and fail

      const previousAmountSuccess = parseFloat(this.responsePrevious.data.successfulAmount);
      const previousAmountFailed = parseFloat(this.responsePrevious.data.failedAmount);
      this.previousTotal = previousAmountSuccess + previousAmountFailed / 100;

      this.percentChange = ((this.totalAmountCurrent - this.previousTotal) / this.previousTotal);

    }, error => {
      this.isLoadingSummary = false;
      this.isDataSummary = false;
      console.log('Error now: ' + error.error)
    });
  }

  async getTopfiveChannel(date) {
    this.isLoadingChannel = true;
    this.isDataChannel = false;

   await  this.dashboardService.getTopFiveChannel(date).subscribe(resposeData => {
      this.isLoadingChannel = false;
      this.isDataChannel = true;
      this.outputChannel = resposeData.data.response;

      this.outputChannel = this.outputChannel.sort((a, b) => (a.total > b.total) ? -1 : 1);

      //splice the array and pick the top five
      let sortArray = this.outputChannel;
       this.outputChannel = sortArray.splice(0, 5);

      // console.log('This is my Response List', this.outputChannel);

    }, error => {
      this.isLoadingChannel = false;
      this.isDataChannel = false;
      console.log('Error now: ' + error.message)
    });
  }

  async getTopfivePayment(date) {
    this.isLoadingPayment = true;
    this.isDataPayment = false;

   await this.dashboardService.getTopFivePayment(date).subscribe(resposeData => {
      // console.log('Unsort Array', resposeData.data);
      this.isLoadingPayment = false;

      this.outputPayment = resposeData.data.response;
      this.outputPayment = this.outputPayment.sort((a, b) => (a.total > b.total) ? -1 : 1);

      //splice the array and pick the top five
      let sortArray = this.outputPayment;
      this.outputPayment = sortArray.splice(0, 5);
      // console.log('Sort Array', resposeData.data.response);

    }, error => {
      this.isLoadingPayment = false;
      this.isDataPayment = false;
      // console.log('Error now: ' + error.message)
    });
  }

  async getTopfiveProduct(date) {
    this.isLoadingProduct = true;
    this.isDataProduct = false;

    await this.dashboardService.getTopFiveProduct(date).subscribe(resposeData => {
      // console.log('This is my Response List', resposeData);
      this.isLoadingProduct = false;
      this.isDataProduct = true;
      this.outputProduct = resposeData.data.response;
      this.outputProduct = this.outputProduct.sort((a, b) => (a.total > b.total) ? -1 : 1);

      //splice the array and pick the top five
      let sortArray = this.outputProduct;
      this.outputProduct = sortArray.splice(0, 5);
      // console.log('This is my Response List', this.outputProduct);

    }, error => {
      this.isLoadingProduct = false;
      this.isDataProduct = false;
      console.log('Error now: ' + error.message)
    });
  }

}
