import { Component, ViewChild } from '@angular/core';
import { ReversedService } from 'src/app/services/reversed.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ReverseModalPage } from 'src/app/component/reverse-modal/reverse-modal.page';
import { SearchModalPage } from 'src/app/component/search-modal/search-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  isDataTransaction:boolean;
  isLoadingTransaction:any;
  reveres:any[];
  page:number = 1;
  reversedAmount:any;
  failedReversalAmount:any;

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
  constructor(private reversedService:ReversedService, private modalController:ModalController) {}

  ngOnInit(){
    this.reveresedTransactions(this.payload, this.page);
  }
  async reveresedTransactions(payload, page) {
    this.isDataTransaction = false;
    this.isLoadingTransaction = true;

    await this.reversedService.getReversedTransactions(payload, page).subscribe(data => {
      this.isDataTransaction = true;
      // console.log('data: ' + data.data.totalCount)
      this.isLoadingTransaction = false;
      this.reveres = data.data.transactions;
      this.reversedAmount = data.data.reversedAmount;
      this.failedReversalAmount = data.data.failedReversalAmount;
      console.log(this.reveres)
    }, error => {
      this.isDataTransaction = false;
      this.isLoadingTransaction = false;
      console.log("Auth Log", JSON.stringify(error));
    })
  }

  async detailsModal(info) {
    console.log(info)
    const reversesmodal = await this.modalController.create({
      component: ReverseModalPage,
      cssClass: 'select-modal-reversed',
      componentProps: {
        "terminalId": info.terminal,
        "channel": info.channel,
        "reference": info.reference,
        "sequence": info.sequence,
        "amount": info.amount,
        "status": info.status,
        "wallet": info.wallet,
        "date": info.date,

      }
    });
    return await reversesmodal.present();
  }


  async openSearchModal() {
    const searchModal = await this.modalController.create({
      component: SearchModalPage,
      cssClass: 'select-modal',
      backdropDismiss: false,
    });
    searchModal.onDidDismiss().then((data) => {
      this.reveres = data.data; 
      console.log((data.data));
      this.reveresedTransactions(data.data, this.page);
    })
    return await searchModal.present();
  }


  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.reveresedTransactions(this.payload, this.page = 1);
      console.log(`current page is : ${this.page}`)
      event.target.complete();

    }, 2000);
  }

  loadMoreTrans(event) {
    setTimeout(() => {
      console.log('Begin async operation');
      this.page = this.page + 1;
      this.reveresedTransactions(this.payload, this.page);
      console.log(`current page is : ${this.page}`)
      event.target.complete();
    }, 500);
  }
  //

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
