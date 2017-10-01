import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {LoginserviceService} from "../service/loginservice.service";
import {ServerserviceService} from "../service/serverservice.service";

@Component({
  selector: 'app-relatedque',
  templateUrl: './relatedque.component.html',
  styleUrls: ['./relatedque.component.css']
})
export class RelatedqueComponent implements OnInit {

  isLogged:boolean=false;             //false
  askedby:string='NotLoggedIn';    //NotLoggedIn
  emailLogged:string;
  userID:string;

  questionid:string = 'NotSelectedId';
  thisquestion:string;
  qaskedby:string;
  qtype:string;



  relatedq = [];

  afterAddMessageflag:boolean = false; //after submission message


  constructor(private route : ActivatedRoute , private loginservice : LoginserviceService, private serverservice : ServerserviceService) {
    route.params.subscribe(
      (idd: Params) => {
        this.questionid = idd['id'];
      }
    );
  }

  ngOnInit() {
    this.loginservice.statusUpdated.subscribe(
      object => {

        this.askedby=object.username;
        this.emailLogged=object.email;
        this.isLogged=object.flag;
        this.userID=object._id;

      }
    );



    this.fetchquestiondetail();

   // this.relatedquestions();


  }


  //fetching details of question...
  fetchquestiondetail(){

    this.loginservice.callbackforlogin.emit('sent data...');

    this.serverservice.fetchquestiondetailforadmin(this.questionid).subscribe(
      data => {
        this.thisquestion = data.question;
        this.qaskedby = data.askedby;
        this.qtype = data.type;
       // alert(this.thisquestion+this.qaskedby+this.qtype +"fetched");
        this.relatedquestions();
      },
      error => {
        alert('reguler error'+error);
      }
    );


  }



  //Retrieve question for given question...

  relatedquestions() {
   // alert(this.thisquestion+this.qaskedby+this.qtype +"related");

    this.loginservice.callbackforlogin.emit('sent data...');
    this.serverservice.RelatedQuestion(this.thisquestion).subscribe(
      data => {
        this.relatedq = data;
        this.relatedq.reverse();
      },
      error => {
        alert('server respond with '+error);
      },
    );
  }


}
