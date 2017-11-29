import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {LoginserviceService} from "../service/loginservice.service";
import {ServerserviceService} from "../service/serverservice.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AnswerObject} from "../Objects/answerobject";
import {QuestionObject} from "../Objects/questionobject";

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
  upvoted:Array<string> = [];

  answer:string;
  addAnswerForm:FormGroup;
  approved:boolean = false;
  answerobject: AnswerObject;

  questionObject: QuestionObject;

  qanswer = [];

  isvoted:boolean;

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
        this.upvoted = data2.upvoted;
        this.checkvoted();
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
      this.questionid,
      this.approved
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

  checkvoted(){
    if(this.upvoted.indexOf(this.askedby)>-1){
      this.isvoted = true;
    }
    else{
      this.isvoted = false;
    }
  }



  //upvote user name on click
  upvote(){

    //alert(this.isvoted);
    if(this.upvoted.indexOf(this.askedby)>-1){
    //  alert('upvote by ' + this.askedby);
      alert('Already voted...');
      alert('votes before removing: ' + this.upvoted);

      this.upvoted.splice(this.upvoted.indexOf(this.askedby),1);

      alert('Vote back...');
    }
    else{
      alert('upvote by ' + this.askedby);
      this.upvoted.push(this.askedby);
      alert('votes after adding: ' + this.upvoted);

    }
    this.updatequestion();

    this.checkvoted();

  }



  //after adding vote update question
  updatequestion(){
    this.questionObject = new QuestionObject(
      this.thisquestion,
      this.qtype,
      this.qaskedby,
      this.upvoted

    );

    this.serverservice.updateQuestion(this.questionObject,this.questionid).subscribe(
      data => {

        alert("server respond : " + data.serverMessage);
      },
      error => {
        alert("server respond with" + error);
      }
    );
  }



}
