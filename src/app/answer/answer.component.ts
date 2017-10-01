import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {LoginserviceService} from "../service/loginservice.service";
import {ServerserviceService} from "../service/serverservice.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AnswerObject} from "../Objects/answerobject";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  isLogged:boolean=false;             //false
  askedby:string='NotLoggedIn';    //NotLoggedIn
  emailLogged:string;
  userID:string;

  questionid:string = 'NotSelectedId';
  thisquestion:string;
  qaskedby:string;
  qtype:string;


  answer:string;
  addAnswerForm:FormGroup;
  answerobject: AnswerObject;

  qanswer = [];

  afterAddMessageflag:boolean = false; //after submission message

  constructor( private route : ActivatedRoute , private loginservice : LoginserviceService, private serverservice : ServerserviceService ) {
    route.params.subscribe(
      (idd: Params) => {
        this.questionid = idd['id'];
        //alert(this.questionid);
      }
    );

    this.addAnswerForm = new FormGroup({
      'answer' : new FormControl(null, [Validators.required])
    });


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

    this.refreshyouranswer();

  }

  //fetching details of question...
  fetchquestiondetail(){

    this.loginservice.callbackforlogin.emit('sent data...');

    this.serverservice.fetchquestiondetailforanswer(this.questionid).subscribe(

      data2 => {
        this.thisquestion = data2.question;
        this.qaskedby = data2.askedby;
        this.qtype = data2.type;

    //   alert(this.thisquestion+this.qaskedby+this.qtype );

      },
      error => {
        alert('server respond with ' +error);
      }
    );
  }

  //Add answer to db
  AddAnswer(){

    this.answerobject = new AnswerObject(
      this.addAnswerForm.get('answer').value,
      this.askedby,
      this.questionid
    );

    this.serverservice.addAnswer(this.answerobject).subscribe(
      data => {
      alert("server respond : " + data.serverMessage);
      this.afterAddMessageflag = true;
      this.addAnswerForm.reset({'rating':0});
      this.refreshyouranswer();
    },
    error => {
      alert("server respond with" + error);
    }


    );
    //this.refreshyouranswer();
  }

  afterAddMessage(){
    this.afterAddMessageflag=false;
  }


  //Retrieve answer for perticuler question id...

  refreshyouranswer() {

    this.loginservice.callbackforlogin.emit('sent data...');
   //alert(this.questionid);
    this.serverservice.AnswerofQuestion(this.questionid).subscribe(
      data => {
        this.qanswer = data;
        this.qanswer.reverse();
      },
      error => {
        alert('server respond with '+error);
      },
    );
  }

}
