import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  querySuccess: any;
  queryFailed: any;

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
  responseSuccess: any;
  responseFail: any;

  previousSuccess: any = null;
  previousFailed: any = null;
  previousTotal: any = null;

  //response holder for success and  fail count
  successCount: any;
  failCount: any;

  //response holder for success and  fail  amount
  successAmount: any = null;
  failAmount: any = null;

  //percentage change
  percentChange: any = null;

  //response holder for success and  fail  percentage
  successPercent: any;
  failPercent: any;

  //second tab button to determin the logic
  second: any;

  //first Tab Data
  firstdDate: any;
  secondDate: any;
  secondStyle: any;
  firstStyle: any;

  //total amount and count
  totalAmount: any = null;
  totalCount: any;

  //previous
  isPresent: boolean;

  arraySuccess: any;
  arrayFailed: any;

  outputChannel: any[] = [];
  outputProduct: any[] = [];
  outputPayment: any[] = [];

  //refreh the page after every 15 minutes
  refresh:Subscription;

  sliderConfig = {
    slidesPerView: 1.7,
    spaceBetween: 1,
    centeredSlides: false,
    loop: false
  };

  backButtonSubscription;
  constructor(public dashboardService: DashboardService,
    public platform: Platform,
    public router: Router,
    public loader: LoaderService,
    public nav: NavController,
    public authService: AuthService) {
  }



  productArray: any = ['mtnvtu', 'mtndata', 'glovtu', 'glodata', 'airtelvtu', 'AIRTELPIN', 'withdrawal', 'ETISALAT', 'VTU', 'multichoice',
    'ikedc', 'eedc', 'transfer', 'ekedc', 'kedco', 'startimes', 'ibedc', 'aedc', 'RCN_FUND_TRANSFER', 'PHED'];

  channelArray: any = ['POS', 'WEB', 'ANDROID', 'ANDROIDPOS', 'ATM', 'DEFAULT', 'OTHERS'];
  paymentMethodArray: any = ['CARD', 'MCARD', 'CASH'];

  async ngOnInit() {
    await this.defaultData(this.date);
    await this.getTopfiveChannel(this.date, 'channels', this.channelArray);
    await this.getTopfiveProduct(this.date, 'products', this.productArray);
    await this.getTopfivePayment(this.date, 'payments', this.paymentMethodArray);

    this.channelHeader = ['Channel', 'Success', 'Fail', 'Total'];
    this.productHeader = ['Product', 'Success', 'Fail', 'Total'];
    this.paymentHeader = ['Payment', 'Success', 'Fail', 'Total'];
    
    this.refresh = interval(15* 60*1000).subscribe(() => {
       this.defaultData(this.date);
       this.getTopfiveChannel(this.date, 'channels', this.channelArray);
       this.getTopfiveProduct(this.date, 'products', this.productArray);
       this.getTopfivePayment(this.date, 'payments', this.paymentMethodArray);

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
    console.log
    this.secondStyle = 0;
    this.firstStyle = 1;
    this.isPresent = true;
    this.previousTotal = null;
    if (this.date == 'Day') {

      this.second = 'Yesterday';
      //logic to fetch the data for today and yesterday
      await this.getSummary(this.date.toLowerCase());
      await this.getTopfiveChannel(this.date, 'channels', this.channelArray);
      await this.getTopfiveProduct(this.date, 'products', this.productArray);
      await this.getTopfivePayment(this.date, 'payments', this.paymentMethodArray);
    } else if (this.date == 'Week') {
      this.second = 'Last Week';
      //logic to fetch the data for current week and Last Week
      await this.getSummary(this.date.toLowerCase());
      await this.getTopfiveChannel(this.date, 'channels', this.channelArray);
      await this.getTopfiveProduct(this.date, 'products', this.productArray);
      await this.getTopfivePayment(this.date, 'payments', this.paymentMethodArray);
    } else if (this.date == 'Month') {
      this.second = 'Last Month';
      //logic to fetch the data for current month  and last month
      await this.getSummary(this.date.toLowerCase());
      await this.getTopfiveChannel(this.date, 'channels', this.channelArray);
      await this.getTopfiveProduct(this.date, 'products', this.productArray);
      await this.getTopfivePayment(this.date, 'payments', this.paymentMethodArray);
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
      await this.getTopfiveChannel(this.firstdDate, 'channels', this.channelArray);
      await this.getTopfiveProduct(this.firstdDate, 'products', this.productArray);
      await this.getTopfivePayment(this.firstdDate, 'payments', this.paymentMethodArray);

    }
    if (this.secondDate == null || this.secondDate == undefined) {
      this.secondDate = 'Yesterday';
      await this.getSummary(this.secondDate.toLowerCase());
      await this.getTopfiveChannel(this.secondDate, 'channels', this.channelArray);
      await this.getTopfiveProduct(this.secondDate, 'products', this.productArray);
      await this.getTopfivePayment(this.secondDate, 'payments', this.paymentMethodArray);

    }
    console.log('present : ' + this.isPresent);
  }

  async  secondTabClick(event) {
    this.secondDate = event;
    this.secondStyle = 1;
    this.firstStyle = 0;
    console.log('second Tab test: ' + event);
    if (event) {
      this.secondDate = event;
      console.log('second Parameter : ' + this.secondDate);
      await this.getSummary(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfiveChannel(this.secondDate.replace(" ", "_").toLowerCase(), 'channels', this.channelArray);
      await this.getTopfiveProduct(this.secondDate.replace(" ", "_").toLowerCase(), 'products', this.productArray);
      await this.getTopfivePayment(this.secondDate.replace(" ", "_").toLowerCase(), 'payments', this.paymentMethodArray);

    }
    else if (this.secondDate == null || this.secondDate == undefined) {
      this.secondDate = 'Yesterday';
      console.log('second Parameter present : ' + this.secondDate);
      await this.getSummary(this.secondDate.replace(" ", "_").toLowerCase());
      await this.getTopfiveChannel(this.secondDate.replace(" ", "_").toLowerCase(), 'channels', this.channelArray);
      await this.getTopfiveProduct(this.secondDate.replace(" ", "_").toLowerCase(), 'products', this.productArray);
      await this.getTopfivePayment(this.secondDate.replace(" ", "_").toLowerCase(), 'payments', this.paymentMethodArray);

    }
    this.isPresent = false;
    console.log('present : ' + this.isPresent);
  }
  getSummary(date) {
    this.isLoadingSummary = true;
    this.isPresent = true;
    this.isDataSummary = false;
    // let present:boolean = tru

    this.previousTotal = null;
    this.dashboardService.summary(date).subscribe(resposeList => {

      this.isLoadingSummary = false;
      this.isDataSummary = true;
      this.responseSuccess = resposeList[0];
      this.responseFail = resposeList[1];

      this.previousSuccess = resposeList[2];
      this.previousFailed = resposeList[3];

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

      //summary of the data for previous  success and fail

      // console.log('end previous success : ' , this.previousSuccess);
      // console.log('end previous fail : ' , this.previousFailed);
      // console.log('end present total : ' , this.totalAmount);

      const previousSuccess = parseFloat(this.previousSuccess.data.amount);
      const previousFailed = parseFloat(this.previousFailed.data.amount);
      this.previousTotal = previousSuccess + previousFailed;

      this.percentChange = ((this.totalAmount - this.previousTotal) / this.previousTotal);


    }, error => {
      this.isLoadingSummary = false;
      this.isDataSummary = false;
      console.log('Error now: ' + error.error)
    });
  }

  getTopfiveChannel(date, type, arrayLength) {
    this.isLoadingChannel = true;
    this.isDataChannel = false;

    this.dashboardService.getTopFive(date, type, arrayLength).subscribe(resposeList => {
      // console.log('This is my Response List', resposeList);
      this.isLoadingChannel = false;
      this.isDataChannel = true;
      let halfLength = resposeList.length / 2;

      let success = resposeList.splice(0, halfLength);
      let fail = resposeList;
      let TotalAmount: any;

      for (let index = 0; index < halfLength; index++) {
        let successVal = success[index];
        let failedVal = fail[index];
        let keys = arrayLength[index];
        arrayLength.forEach(element => {
          let pushedSuccess = {};
          let pushedFailed = {};
          let key = element;
          this.arraySuccess = pushedSuccess[key] = successVal;
          this.arrayFailed = pushedFailed[key] = failedVal;
          TotalAmount = parseFloat(successVal.data.amount) + parseFloat(failedVal.data.amount);

        });

        this.outputChannel[index] = { 'name': keys, 'successful': parseFloat(successVal.data.amount), 'failed': parseFloat(failedVal.data.amount), 'total': TotalAmount };
      }

      //sort the array from the highest price to lowest price
      this.outputChannel = this.outputChannel.sort((a, b) => (a.total > b.total) ? -1 : 1);

      //splice the array and pick the top five
      let sortArray = this.outputChannel;
      this.outputChannel = sortArray.splice(0, 5);
      // console.log('channel');
      // console.log(JSON.stringify( this.outputChannel));

    }, error => {
      this.isLoadingChannel = false;
      this.isDataChannel = false;
      console.log('Error now: ' + error.message)
    });
  }

  getTopfivePayment(date, type, arrayLength) {
    this.isLoadingPayment = true;
    this.isDataPayment = false;

    this.dashboardService.getTopFive(date, type, arrayLength).subscribe(resposeList => {
      // console.log('This is my Response List', resposeList);
      this.isLoadingPayment = false;
      let halfLength = resposeList.length / 2;

      let success = resposeList.splice(0, halfLength);
      let fail = resposeList;
      let TotalAmount: any;

      for (let index = 0; index < halfLength; index++) {
        let successVal = success[index];
        let failedVal = fail[index];
        let keys = arrayLength[index];
        arrayLength.forEach(element => {
          let pushedSuccess = {};
          let pushedFailed = {};
          let key = element;
          this.arraySuccess = pushedSuccess[key] = successVal;
          this.arrayFailed = pushedFailed[key] = failedVal;
          TotalAmount = parseFloat(successVal.data.amount) + parseFloat(failedVal.data.amount);

        });

        this.outputPayment[index] = { 'name': keys, 'successful': parseFloat(successVal.data.amount), 'failed': parseFloat(failedVal.data.amount), 'total': TotalAmount };

      }

      //sort the array from the highest price to lowest price
      this.outputPayment = this.outputPayment.sort((a, b) => (a.total > b.total) ? -1 : 1);

      //splice the array and pick the top five
      let sortArray = this.outputPayment;
      this.outputPayment = sortArray.splice(0, 3);
      // console.log('Payment');
      // console.log(JSON.stringify(this.outputPayment));

    }, error => {
      this.isLoadingPayment = false;
      this.isDataPayment = false;
      console.log('Error now: ' + error.message)
    });
  }

  getTopfiveProduct(date, type, arrayLength) {
    this.isLoadingProduct = true;
    this.isDataProduct = false;

    this.dashboardService.getTopFive(date, type, arrayLength).subscribe(resposeList => {
      // console.log('This is my Response List', resposeList);
      this.isLoadingProduct = false;
      this.isDataProduct = true;
      let halfLength = resposeList.length / 2;

      let success = resposeList.splice(0, halfLength);
      let fail = resposeList;
      let TotalAmount: any;

      for (let index = 0; index < halfLength; index++) {
        let successVal = success[index];
        let failedVal = fail[index];
        let keys = arrayLength[index];
        arrayLength.forEach(element => {
          let pushedSuccess = {};
          let pushedFailed = {};
          let key = element;
          this.arraySuccess = pushedSuccess[key] = successVal;
          this.arrayFailed = pushedFailed[key] = failedVal;
          TotalAmount = parseFloat(successVal.data.amount) + parseFloat(failedVal.data.amount);

        });

        this.outputProduct[index] = { 'name': keys, 'successful': parseFloat(successVal.data.amount), 'failed': parseFloat(failedVal.data.amount), 'total': TotalAmount };

      }

      //sort the array from the highest price to lowest price
      this.outputProduct = this.outputProduct.sort((a, b) => (a.total > b.total) ? -1 : 1);

      //splice the array and pick the top five
      let sortArray = this.outputProduct;
      this.outputProduct = sortArray.splice(0, 5);
      // console.log('Payment');
      // console.log(JSON.stringify( this.outputProduct));

    }, error => {
      this.isLoadingProduct = false;
      this.isDataProduct = false;
      console.log('Error now: ' + error.message)
    });
  }

}
