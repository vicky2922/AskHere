import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LoginserviceService} from "../service/loginservice.service";
import {ServerserviceService} from "../service/serverservice.service";
import {QuestionObject} from "../Objects/questionobject";

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
  upvoted:Array<string> = [];

  questionObject: QuestionObject;

  relatedq = [];

  afterAddMessageflag:boolean = false; //after submission message


  constructor(private route2 : Router,private route : ActivatedRoute , private loginservice : LoginserviceService, private serverservice : ServerserviceService) {
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
        this.upvoted = data.upvoted;
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


  AddQuestiontoWeb(){

    this.questionObject = new QuestionObject(
      this.thisquestion,
      this.qtype,
      this.qaskedby,
      this.upvoted

    );


    this.serverservice.addQuestionToWeb(this.questionObject).subscribe(
      data => {
        alert("server respond : " + data.serverMessage);
        this.afterAddMessageflag = true;
        this.RemoveQuestion();
      },
      error => {
        alert("server respond with" + error);
      }
    );

  }



  //Delete Question by user...
  RemoveQuestion(){
    this.serverservice.DeleteQuestionByAdmin(this.questionid).subscribe(
      data => {
        alert('server response : ' + data.serverMessage);
       // this.refreshyourquestion();
      },
      error => {
        alert('server response : ' + error);
      }

    );
    this.route2.navigate(['admin']);
  }


}
