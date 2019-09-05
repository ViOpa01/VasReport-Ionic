import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { SearchModalPage } from '../../component/search-modal/search-modal.page';
import { TransactionService } from '../../services/transaction.service';
import { InfoModalPage } from '../../component/info-modal/info-modal.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  //boolean to check for state of loading dtat 
  isDataTransaction: boolean;
  isDataSummary: boolean;

  // boolean to check for the state of the loading
  isLoadingTransaction: boolean;
  isLoadingSummary: boolean;

  trans: any;
  isSummaryData: any;


  summaryTotalCount: any;
  summaryTotalAmount: any;

  summarySuccessCount: any;
  summarySuccessAmount: any;
  summarysuccessPercent: any;

  summaryFailCount: any;
  summaryFailAmount: any;
  summaryFailPercent: any;

  uniqueUser: any;

  page: any = 1;
  dateRange: any;

  payload = {
    "dateRange": "2019/09/5 - 2019/09/5",
    "terminalId": "",
    "walletId": "",
    "accountNumber": "",
    "paymentMethod": "",
    "cardRRN": "",
    "transactionReference": "",
    "phoneNumber": "",
    "sequenceNumber": "",
    "debitReference": "",
    "product": "",
    "transactionType": "",
    "transactionStatus": "",
    "transactionChannel": "=",
    "searchField": "",
    "viewPage": "2",
  };


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public modalController: ModalController, private transService: TransactionService) { }

  ngOnInit() {
    let DateObj = new Date();
    this.dateRange = DateObj;
    // this.dateRange = (String) (DateObj.getFullYear() + '/' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '/' + ('0' + DateObj.getDate()).slice(-2));
    // console.log('current Date Range', `${this.dateRange} - ${this.dateRange}`);
    this.transactionSummary();
    this.transactionDetails(this.page);
  }

 

  async transactionDetails(page) {
    this.isDataTransaction = false;
    this.isLoadingTransaction = true;
    await this.transService.getTransactionsDetails(this.payload, page).subscribe(data => {
      this.isDataTransaction = true;
      // console.log('data: ' + data.data.totalCount)
      this.isLoadingTransaction = false;
      this.trans = data.data.transactions;
      // console.log(this.trans)
    }, error => {
      this.isDataTransaction = false;
      this.isLoadingTransaction = false;
      console.log('error : ' + error.message);
    })
  }


  async transactionSummary() {
    this.isDataSummary = false;
    this.isLoadingSummary = true;
    await this.transService.getSummary(this.payload).subscribe(data => {
      this.isDataSummary = true;
      this.isLoadingSummary = false;

      // Failed count amount and percentage
      this.summaryFailCount = data.data.failedCount;
      this.summaryFailAmount = parseFloat(data.data.failedAmount) / 100;
      this.summaryFailPercent = data.data.failedPercent;

      // successful count amount and percentage
      this.summarySuccessCount = data.data.successfulCount;
      this.summarySuccessAmount = parseFloat(data.data.successfulAmount) / 100;
      this.summarysuccessPercent = data.data.successfulPercent;


      // total amount and count
      this.summaryTotalAmount = parseFloat(data.data.totalAmount) / 100;
      this.summaryTotalCount = data.data.transactionCount;

      // unique user count
      this.uniqueUser = data.data.usersCount;

      console.log(this.uniqueUser)
    }, error => {
      this.isDataTransaction = false;
      this.isLoadingTransaction = false;
      console.log('error : ' + error.message);
    })
  }


  async detailsModal(info) {
    console.log(info)
    const detailsmodal = await this.modalController.create({
      component: InfoModalPage,
      cssClass: 'select-modal-details',
      componentProps: {
        "terminalId": info.terminal,
        "agentId": info.transactionAuthCode,
        "phoneNumber": info.VASCustomerPhone,
        "accountNumber": info.VASCustomerAccount,
        "address": info.VASCustomerAddress,
        "billerName": info.VASBillerName,
        "channel": info.channel,
        "providerName": info.VASProviderName,
        "reference": info.providerReference,
        "authCode": info.transactionAuthCode,
        "stan": info.transactionSTAN,
        "RRN": info.transactionRRN,
        "name": info.name,
        "sequence": info.sequence,
        "category": info.category,
        "nairaAmount": info.nairaAmount,
        "status": info.status,
        "message": info.message,
      }
    });
    return await detailsmodal.present();
  }


  async openSearchModal() {
    // console.log('blah ..... ');
    const searchModal = await this.modalController.create({
      component: SearchModalPage,
      cssClass: 'select-modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
    return await searchModal.present();

  }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.transactionDetails(this.page = 1);
      this.transactionSummary();
      console.log(`current page is : ${this.page}`)
      event.target.complete();
    }, 2000);
  }

  loadMoreTrans(event) {
    setTimeout(() => {
      console.log('Begin async operation');
      this.page = this.page + 1;
      this.transactionDetails(this.page);
      console.log(`current page is : ${this.page}`)
      event.target.complete();
    }, 500);
  }
  //

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
