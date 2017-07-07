import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerserviceService} from "../service/serverservice.service";
import {LoginserviceService} from "../service/loginservice.service";
import {Router} from "@angular/router";
import {UserObjectALL} from "../Objects/userobject.user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  errormessageflag: boolean = false;




  constructor(private loginservice: ServerserviceService, private logindataservice: LoginserviceService, private route: Router) { }



  ngOnInit() {

    this.LoginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  errorMessageclose(){
    this.errormessageflag = false;
  }

  Login(){

    var privateUser = new LoginObject(this.LoginForm.get('username').value,this.LoginForm.get('password').value);

    this.loginservice.canLogin(privateUser).subscribe(



      LoginData => {
        if((LoginData.username === privateUser.username || LoginData.email === privateUser.username)&& LoginData.password === privateUser.password ) {
          this.logindataservice.setisLogged(); //Creating session
          this.logindataservice.setuserLogged(LoginData.username);
          this.logindataservice.setemailLogged(LoginData.email);
          this.logindataservice.setid(LoginData._id);
          this.logindataservice.setfirstname(LoginData.firstname);

          this.logindataservice.statusUpdated.emit({_id: LoginData._id,username: LoginData.username,email: LoginData.email,flag:true});

          this.logindataservice.userObjectLoggedIn.emit(
            {_id:LoginData._id,
              username:LoginData.username,
              email:LoginData.email,
              password:LoginData.password,
              firstname:LoginData.firstname
            });

          console.log(new UserObjectALL(LoginData._id,LoginData.username,LoginData.email,LoginData.password,LoginData.firstname));

          this.route.navigate(['/']);

        }
        else{
          this.logindataservice.setLoggedOutValues(); //call method in loginserice and make default params

          this.errormessageflag = true;

        }

      },

      error => {
        alert("Username/emailID or password is not valid..." + error);

      },

      () => console.log("Susbscribe is completed...")



    );


  }

}

export class LoginObject{
  username: string;
  password: string;

  constructor(username: string, password: string){
    this.username=username;
    this.password=password;
  }
}
