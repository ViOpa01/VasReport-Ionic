import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SockectService {

  constructor(private socket: Socket) { }


  getMessage() {
    return this.socket
      .fromEvent("vas-journal").pipe(
        map(data => {
          return data;
        }, error => {
          console.log('An Error Occured !', error.getMessage);
        }));
  }

  disconnect(){
    return this.socket.disconnect();
  }

  connect(){
    return this.socket.connect();
  }

}
