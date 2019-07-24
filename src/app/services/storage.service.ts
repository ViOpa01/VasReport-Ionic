import { Injectable } from '@angular/core';
import { EncrDecrService } from './encr-decr.service';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Constants } from '../common/constant'

@Injectable({
    providedIn: "root"
})
export class StorageService {
    constructor( private crytpSerive:EncrDecrService ){}

    public get<T>(storage_name:string){
        // let value = <any>this.storage.getItem(storage_name);
        let value = <any>localStorage.getItem(storage_name);
        if(!value) return null;
        return this.crytpSerive.get(Constants.KEYS.TOKEN, value) as T;
    }

    public set(storage_name:string, value:any) {
        return localStorage.setItem(storage_name, this.crytpSerive.set(Constants.KEYS.TOKEN, JSON.stringify(value)));
    }

    public clear (storage_name){
        localStorage.remove(storage_name);
    }
    public clear_all(){
        localStorage.clear();
    }
}