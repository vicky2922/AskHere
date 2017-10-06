import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginserviceService} from "../service/loginservice.service";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerserviceService} from "../service/serverservice.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  isLogged: boolean = false;             //false
  userLogged: string = 'NotLoggedIn';    //NotLoggedIn
  emailLogged: string = 'NoEmailLoggedIn';
  userID:string = 'NotID'; //NotID

  _id:string;
  adminsetting:boolean = false;
  clientip:string;

  searchKey: string;
  morc: string;
  SearchForm:FormGroup;
  suggestion:any =['Loading...'];
  searchby:boolean = false;



  constructor(private LoginDataService: LoginserviceService, private route: Router, private serverservice: ServerserviceService) {

   /* LoginDataService.callbackforlogin.subscribe(
      data => {
        if (this.isLogged) {
      //    alert('got message from questions constructor');
       //   alert(this.isLogged + this.emailLogged + this.userLogged);
          this.LoginDataService.statusUpdated.emit(
            {
              _id: this.userID,
              username: this.userLogged,
              email: this.emailLogged,
              flag: this.isLogged
            }
          );
        }
      });*/

    LoginDataService.statusUpdated.subscribe(
      object => {
        this.userID = object._id;
        this.isLogged = object.flag;
        this.userLogged = object.username;
        this.emailLogged = object.email;
      }
    );

    LoginDataService.adminstatus.subscribe(
      flag => {
        this.adminsetting = flag.flag;
      }
    );

    this.serverservice.getIP().subscribe(
      data => {
        if (!isUndefined(data)) {
          this.clientip = data.client;
        }
      }
    );

    this.SearchForm = new FormGroup({
      'SearchKey': new FormControl(null, [Validators.required]),
      'Selected': new FormControl('question', [Validators.required])
    });



    this.serverservice.getSession().subscribe(
      dataa => {
        if (!isUndefined(dataa)) {
          for (let one of dataa) {
            //console.log(one.clientIP);
            //alert('session found');
            //console.log(one.data.username);
            if (one.clientIP === this.clientip) {
              console.log("Same PC");
              this.LoginDataService.statusUpdated.emit({
                _id: one.data._id,
                username: one.data.username,
                email: one.data.email,
                flag: true
              });
              this.LoginDataService.setisLogged();                          //creating session
              this.LoginDataService.setuserLogged(one.data.username);
              this.LoginDataService.setemailLogged(one.data.email);
              this.LoginDataService.setid(one.data._id);

              if (one.data.username === '14bce013' || one.data.username === '14bce058') {
                this.LoginDataService.adminstatus.emit({flag: true});

              }
              else {
                this.LoginDataService.adminstatus.emit({flag: false});
              }

            }
          }
        } else {
          //alert('session not found')
        }
      },
      error => {
        alert("Server Response:\n" + error);
      }
    );


    console.log("From navigation");
  }

  ngOnInit() {
    this.LoginDataService.callbackforlogin.subscribe(
      data => {
        if (this.isLogged)
          this.LoginDataService.statusUpdated.emit({
            _id: this._id,
            username: this.userLogged,
            email: this.emailLogged,
            flag: true
          });
      }
    )
  }


  LogOut() {

    this.serverservice.deleteSession(this._id).subscribe(
      data => {
        if (data.flag) {
          alert("Successfully logged out!");
        } else {
          alert("Successfully logged out!");
        }
      }
    );

    this.LoginDataService.setLoggedOutValues();

    this.route.navigate(['/']);

   // this.LoginDataService.statusUpdated.emit({_id:'NotID', username: 'NotLoggedIn', email: 'NoEmailLoggedIn', flag: false});
    //this.LoginDataService.adminstatus.emit({flag:false});
    //this.route.navigate(['/']);
  }

}
