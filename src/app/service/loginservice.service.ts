/**
 * Created by Vicky on 7/3/2017.
 */
import {EventEmitter, Injectable} from '@angular/core';
import {UserObjectALL} from "../Objects/userobject.user";

@Injectable()
export class LoginserviceService {
  private isLogged: boolean = false;             //keep detail of logged in username
  private userLogged: string = 'NotLoggedIn';    //NotLoggedIn //true only if user is logged in
  private emailLogged: string = 'NoEmailLoggedIn';
  private _idLogged: string = 'none';
  private firstname: string;

  userObjectLoggedIn = new EventEmitter<{
    _id: string, username: string, email: string, password: string, firstname: string
  }>();

  statusUpdated = new EventEmitter<{ _id:string, username: string, email: string, flag: boolean }>();

  callbackforlogin = new EventEmitter<string>();




  constructor() {
  }


  setid(value: string) {
    this._idLogged = value;
  }

  getid() {
    return this._idLogged;
  }

  setisLogged() {
    this.isLogged = true;
  }

  setuserLogged(value: string) {
    this.userLogged = value;
  }

  setemailLogged(value: string) {
    this.emailLogged = value;
  }

  setfirstname(value: string){
    this.firstname = value;
  }

  getfirstname(){
    return this.firstname;
  }

  getisLogged() {
    return this.isLogged;
  }

  getuserLogged() {
    return this.userLogged;
  }

  getemailLogged() {
    return this.emailLogged;
  }

  setLoggedOutValues() {
    this.isLogged = false;
    this.userLogged = 'NotLoggedIn';
    this.emailLogged = 'NoEmailLoggedIn';
    this._idLogged = 'none';
    this.statusUpdated.emit({_id: 'NotID',username: 'NotLoggedIn', email: 'NoEmailLoggedIn', flag: false});

  }
}
