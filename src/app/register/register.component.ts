import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerserviceService} from "../service/serverservice.service";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {LoginserviceService} from "../service/loginservice.service";
import {LoginObject} from "../login/login.component";
import {UserObjectALL} from "../Objects/userobject.user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  onSuccess:boolean = false;
  SignUpForm: FormGroup;
  availability:boolean = true;
  availability2:boolean = true;

  private tempusername: string;
  private tempemail: string;


  constructor(private newUserService: ServerserviceService,private logindataservice: LoginserviceService,private route: Router) { }

  ngOnInit() {
    this.SignUpForm = new FormGroup(
      {
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required,Validators.email] ),
        'password': new FormControl(null, [Validators.required]),
        'cpassword': new FormControl(null, [Validators.required,match('password')]),
        'firstname': new FormControl(null, [Validators.required])

      }
    );


  }

  checkUserName() {
    //to check if username already exists or not
    this.tempusername = this.SignUpForm.get('username').value;
    if (this.tempusername !== '') {
      this.newUserService.canTakeUserName(this.tempusername).subscribe(
        message => {
          this.availability = message.available;
          //console.log(this.availability);
        },
        error => {
          alert("Server Responded with Error!" + error)
        },
        () => console.log("New Check Completed."),
      );
    }
  }

  checkEmail(){
    this.tempemail = this.SignUpForm.get('email').value;
    if(this.tempemail !== ''){
      this.newUserService.canTakeEmail(this.tempemail).subscribe(
        message => {
          this.availability2 = message.available;
          //console.log(this.availability2);
        },
        error => { alert("Server Responded with Error!"+error)},
        () => console.log("New Check Completed."),
      );
    }
  }


  signUP(){
    var newUser = new newRegistration(
      this.SignUpForm.get('username').value,
      this.SignUpForm.get('email').value,
      this.SignUpForm.get('password').value,
      this.SignUpForm.get('firstname').value);

    console.log(newUser);
    this.newUserService.addNewUser(newUser).subscribe(
      data => {
        this.onSuccess = true;
        console.log("On Successful Insertion of "+ data.email);
           //all field only will be reset if data successfully inserted

       // this.route.navigate(['/']);
      },
      err => console.log(err),
      () => console.log("Completed")
    );        //sending object to service and returning observable




    var privateUser = new LoginObject(this.SignUpForm.get('username').value,this.SignUpForm.get('password').value);

    this.newUserService.canLogin(privateUser).subscribe(



      LoginData => {

         // alert(LoginData.username);

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




      },



      () => console.log("Susbscribe is completed...")



    );



  }
}


//ValidarionClass for different validarion
export class validationClass {

  static notValidEmail(control: FormControl): {[s: string]: boolean}{
    if (!control.value.match(/^[a-z]$/)) {
      return { 'invalidEmailAddress': true };
    }else
      return null;
  }

  static isUsernameAvailable(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(() => {
        //write server code
        if(control.value === 'test@test.com'){
          resolve({'UsernameisForbidden': true});
        }else {
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}




//Password and Confirmpassword Validator
export const match = (match: string) => {
  return (control: FormControl) => {
    const group = control.parent;
    if (group && group.get(match)) {
      const matchfield = group.get(match);
      if (matchfield && matchfield.value === control.value) return null;
    }
    return {
      validateMatch: {
        valid: false
      }
    };
  };
};


export class newRegistration {
  username: string;
  email: string;
  password: string;
  firstname: string;

  constructor(username: string, email: string, password: string, firstname: string){
    this.username=username;
    this.email=email;
    this.password=password;
    this.firstname=firstname;
  }
}
