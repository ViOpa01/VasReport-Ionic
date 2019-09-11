import { Component, OnInit } from '@angular/core';
import { ServiceStatusService } from 'src/app/services/service-status.service';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.page.html',
  styleUrls: ['./service-status.page.scss'],
})
export class ServiceStatusPage implements OnInit {

  serviceArray: any = ['multichoice', 'ikedc', 'eedc', 'ekedc', 'startimes', 'ibedc', 'aedc', 'transfer', 'PHED', 'smile'];
  services: any[];
  isLoadingStatus: boolean;
  isDataStatus: boolean;
  currentStatus: any;
  data: any;

  constructor(public serviceStatus: ServiceStatusService) { }

  ngOnInit() {
    this.getServiceStatus(this.serviceArray)
  }

  getServiceStatus(arrayLength) {
    this.isLoadingStatus = true;
    // this.isDataStatus = false;
    this.serviceStatus.switchServiceStatus(arrayLength).subscribe(ResponseList => {
      this.isLoadingStatus = false;
      this.isDataStatus = true;
      this.services = ResponseList.sort();
      console.log(ResponseList);
    }, error => {
      this.isLoadingStatus = false;
      this.isDataStatus = false;
      console.log(`error ${error.message}`);

    })
  }

  callSwitch(service, status) {
    this.currentStatus = status;
    if (status == "ON") {
      this.currentStatus = "OFF";
    } else if (status == "OFF") {
      this.currentStatus = "ON";
    }

    // Create Object
    let payload = {
      "service": service,
      "action": this.currentStatus
    }
    console.log(JSON.stringify(this.currentStatus));
    // console.log(payload);
    return this.serviceStatus.switchAction(payload).subscribe(data => {
      this.data = data;
      this.getServiceStatus(this.serviceArray);
      // console.log(data);
    }, (error) => {
      console.log('an error occured' + error.friendlyMessage);
    });

    
  }

}
