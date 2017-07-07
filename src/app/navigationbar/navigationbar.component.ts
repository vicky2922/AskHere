import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginserviceService} from "../service/loginservice.service";

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


  constructor(private LoginDataService: LoginserviceService, private route: Router) {

    LoginDataService.callbackforlogin.subscribe(
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
      });

    LoginDataService.statusUpdated.subscribe(
      object => {
        this.userID = object._id;
        this.isLogged = object.flag;
        this.userLogged = object.username;
        this.emailLogged = object.email;
      }
    );


    console.log("From navigation");
  }

  ngOnInit() {
  }


  LogOut() {
    this.LoginDataService.statusUpdated.emit({_id:'NotID', username: 'NotLoggedIn', email: 'NoEmailLoggedIn', flag: false});
    //this.LoginDataService.adminstatus.emit({flag:false});
    //this.route.navigate(['/']);
  }

}
