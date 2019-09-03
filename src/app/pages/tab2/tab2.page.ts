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


  limit = 50;
  page: any = 1;

  ngOnInit() {
    this.transactionDetails(this.page);
  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public modalController: ModalController, private transService: TransactionService) { }
  async transactionDetails(page) {
    this.isDataTransaction = false;
    this.isLoadingTransaction = true;
    let payload = {
      "dateRange": "2019/09/3 - 2019/09/3",
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
    await this.transService.getTransactionsDetails(payload, page).subscribe(data => {
      this.isDataTransaction = true;
      // console.log('data: ' + data.data.totalCount)
      this.isLoadingTransaction = false;
      this.trans = data.data.transactions;
      console.log(this.trans)
    }, error => {
      this.isDataTransaction = false;
      this.isLoadingTransaction = false;
      console.log('error : ' + error.message);
    })
  }

  async detailsModal(info) {
    const detailsmodal = await this.modalController.create({
      component: InfoModalPage,
      cssClass: 'select-modal',
      componentProps: {
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

  loadMoreTrans(event) {
    setTimeout(() => {
      console.log('Begin async operation');
      this.page = this.page + 1;
      this.transactionDetails(this.page);
      console.log(`current page is : ${this.page}` )
      event.target.complete();
    }, 500);
  }
  //

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
