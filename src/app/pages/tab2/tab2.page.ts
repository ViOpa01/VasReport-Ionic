import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { SearchModalPage } from '../../component/search-modal/search-modal.page';
import { TransactionService } from '../../services/transaction.service';
import { InfoModalPage } from '../../component/info-modal/info-modal.page';
import { SockectService } from '../../services/sockect.service';
import { present } from '@ionic/core/dist/types/utils/overlays';

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
  // dateRange: any;

  private subs: any;
  dataSocket: any[];

  DateObj = new Date();
  dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    "dateRange": this.newRange,
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
    "transactionChannel": "",
    "searchField": "",
    "viewPage": "2",
  };

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public modalController: ModalController, private transService: TransactionService, private socket: SockectService) {
  }

  ngOnInit() {


    this.transactionSummary(this.payload);
    this.transactionDetails(this.payload, this.page);

    //socket data comming from server
    setTimeout(() => {
      console.log('for socket data');
      this.getSocketData();
    }, 3000);
  }


  async getSocketData() {
    await this.socket.getMessage().subscribe((Socketdata: any) => {
      console.log("this is socket data", Socketdata.data)
      this.trans.unshift(Socketdata.data);

      if (Socketdata.data.status == "failed") {
        this.summaryFailAmount += Socketdata.data.nairaAmount;
        this.summaryTotalAmount += Socketdata.data.nairaAmount;
        this.summaryTotalCount = this.summaryTotalCount + 1;
        this.summaryFailCount = this.summarySuccessCount + 1;
      } else if (Socketdata.data.status == "successful") {
        this.summaryTotalAmount += Socketdata.data.nairaAmount;
        this.summarySuccessAmount += Socketdata.data.nairaAmount;
        this.summaryTotalCount = this.summaryTotalCount + 1;
        this.summarySuccessCount = this.summarySuccessCount + 1;
      }
      console.log(`transactions ${this.trans.length}`);
      // this.data.sort((a,b)=>{a.})
    });
  }

  async transactionDetails(payload, page) {
    this.isDataTransaction = false;
    this.isLoadingTransaction = true;

    await this.transService.getTransactionsDetails(payload, page).subscribe(data => {
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


  async transactionSummary(payload) {
    this.isDataSummary = false;
    this.isLoadingSummary = true;
    await this.transService.getSummary(payload).subscribe(data => {
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
    });
    searchModal.onDidDismiss().then((data) => {
      // this.trans = data.data; 
      console.log((data.data));

      this.transactionSummary(data.data);
      this.transactionDetails(data.data, this.page);
    })
    return await searchModal.present();
  }


  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.transactionDetails(this.payload, this.page = 1);
      this.transactionSummary(this.payload);
      console.log(`current page is : ${this.page}`)
      event.target.complete();
    }, 2000);
    this.getSocketData();
  }

  loadMoreTrans(event) {
    setTimeout(() => {
      console.log('Begin async operation');
      this.page = this.page + 1;
      this.transactionDetails(this.payload, this.page);
      console.log(`current page is : ${this.page}`)
      event.target.complete();
    }, 500);
  }
  //

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
