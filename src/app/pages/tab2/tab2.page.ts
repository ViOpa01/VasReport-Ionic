import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { SearchModalPage } from '../../component/search-modal/search-modal.page';
import { TransactionService } from '../../services/transaction.service';
import { InfoModalPage } from '../../component/info-modal/info-modal.page';
import { SockectService } from '../../services/sockect.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excel.service';


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
    "viewPage": "",
    "download": false
  };

  payloadDownload = {
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
    "viewPage": "",
    "download": true
  };

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public modalController: ModalController,
    private transService: TransactionService,
    private socket: SockectService,
    public toast: LoaderService,
    public excelService: ExcelService) {
  }

  ngOnInit() {

    // this.downloaFile(this.payload, this.page);
    this.transactionSummary(this.payload);
    this.transactionDetails(this.payload, this.page);

    //socket data comming from server
    setTimeout(() => {
      this.getSocketData();
    }, 5000);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.trans, 'sample');

  }
  async downloaFile() {
    this.toast.presentLoadingWithOptions();
    await this.transService.getTransactionsDetails(this.payloadDownload, this.page).subscribe(
      response => {
        const data = response.data.transactions;
        this.excelService.exportAsExcelFile(data, `Itex Report for ${this.payloadDownload.dateRange}`);
        this.toast.hideLoader();
      }, error => {
        this.toast.hideLoader();
        console.log(error);

      }
    );
  }

  async getSocketData() {
    this.socket.connect();
    await this.socket.getMessage().subscribe((Socketdata: any) => {
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
    });
  }

  async transactionDetails(payload, page) {
    this.isDataTransaction = false;
    this.isLoadingTransaction = true;

    await this.transService.getTransactionsDetails(payload, page).subscribe(data => {
      this.isDataTransaction = true;
      this.isLoadingTransaction = false;
      this.trans = data.data.transactions;
    }, error => {
      this.isDataTransaction = false;
      this.isLoadingTransaction = false;
      console.log("Auth Log", JSON.stringify(error));
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

    }, error => {
      this.isDataTransaction = false;
      this.isLoadingTransaction = false;
      console.log('error : ' + error.message);
    })
  }


  async detailsModal(info) {
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
    const searchModal = await this.modalController.create({
      component: SearchModalPage,
      cssClass: 'select-modal',
      backdropDismiss: true,
    });
    searchModal.onDidDismiss().then((data) => {
      // this.trans = data.data;
      this.socket.disconnect();
      if (data.data != undefined) {
        this.transactionSummary(data.data);
        this.transactionDetails(data.data, this.page);
      }
    })
    return await searchModal.present();
  }


  doRefresh(event) {
    setTimeout(() => {
      this.transactionDetails(this.payload, this.page = 1);
      this.transactionSummary(this.payload);
      this.getSocketData();
      event.target.complete();

    }, 2000);
  }

  loadMoreTrans(event) {
    setTimeout(() => {
      this.page = this.page + 1;
      this.transactionDetails(this.payload, this.page);
      event.target.complete();
    }, 500);
  }
  //

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
