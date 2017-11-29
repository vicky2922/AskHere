import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../service/questionservice.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {QuestionObject} from "../Objects/questionobject";
import {ServerserviceService} from "../service/serverservice.service";
import {LoginserviceService} from "../service/loginservice.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {



  isLogged:boolean=false;             //false
  askedby:string='NotLoggedIn';    //NotLoggedIn
  emailLogged:string;
  userID:string;

  yourquestions = [];
  removeDisable: boolean = true;
  confirm: string = '';


  afterAddMessageflag:boolean = false; //after submission message
  added:boolean = true;     //for question check if already added in db or not
  atleastone:boolean = false;
  typeString:string = '';
  typearray = ['','Technical','General Knowledge','Political','Science','Medical','Entertainment','Travelling','Business'];
  typebool = [false,false,false,false,false,false,false,false,false];
  tempquestion:string = '';

//  upvote:Array<string>;
  AddQuestionForm: FormGroup;
  questionObject: QuestionObject;



  constructor(private questionservice : QuestionService, private serverservice : ServerserviceService,private loginservice : LoginserviceService) {

    /*this.loginservice.statusUpdated.subscribe(
      object => {
        this.isLogged=object.flag;
        this.askedby=object.username;
        this.emailLogged=object.email;

      },



    );*/

    this.AddQuestionForm = new FormGroup({
      'question' : new FormControl(null, [Validators.required]),
      'type': new FormControl({value:'',disabled:true})
    });

    //this.loginservice.callbackforlogin.emit('sent data...');
  }

  ngOnInit() {
    this.loginservice.callbackforlogin.emit('sent data...');

    this.loginservice.statusUpdated.subscribe(
      object => {

    //    alert(object.flag + object.email + object.username);
     //   alert("Got callnback");

        this.askedby=object.username;
        this.emailLogged=object.email;
        this.isLogged=object.flag;
        this.userID=object._id;

      }
    );

    this.refreshyourquestion();
  }


  AddQuestion(){


    this.loginservice.callbackforlogin.emit('sent data...');
   // alert('on add question');
   // alert(this.askedby + this.emailLogged + this.isLogged);


    this.questionObject = new QuestionObject(
      this.AddQuestionForm.get('question').value,
      this.typeString,
      this.askedby/*,
      this.upvote*/

    );

    this.serverservice.addQuestion(this.questionObject).subscribe(
      data => {
        alert("server respond : " + data.serverMessage);
        this.afterAddMessageflag = true;

        //resetting form
        var x;
        for(x = 1; x<=8; x++){
          this.typebool[x] = false;
        }
        this.atleastone = false;
        this.AddQuestionForm.reset({'rating':0});
      },
      error => {
        alert("server respond with" + error);
      }
    );

    this.refreshyourquestion();
  }

  //to check if question already exists or not
  checkQuestion() {

    this.tempquestion = this.AddQuestionForm.get('question').value;
    if(this.tempquestion !== ''){
      this.serverservice.canTakeQuestion(this.tempquestion).subscribe(
        message => {
          this.added = message.available;
        },
        error => {
          alert("Server respond with error" + error);
        },
        () => console.log("Checking of question completed...")

      );
    }




  }


  addType(number: number){
    this.typebool[number] =! this.typebool[number];
    var i;
    if(
      this.typebool[1] || this.typebool[2] || this.typebool[3] || this.typebool[4] || this.typebool[5] || this.typebool[6] || this.typebool[7] || this.typebool[8]
    ) {
      this.atleastone = true;
    }
    else{
      this.atleastone = false;
    }

    this.typeString='';
    for(i=1;i<=8;i++){
      if(this.typebool[i])
        this.typeString += this.typearray[i]+" ";
    }
  }

  afterAddMessage(){
    this.afterAddMessageflag=false;
  }

  //confirmation to deletion
  entered() {
    if (this.confirm === this.askedby)
      this.removeDisable = false;
    else
      this.removeDisable = true;
  }


  //Delete Question by user...
  removeQuestion(_id:string){
    this.serverservice.DeleteQuestion(_id).subscribe(
      data => {
        alert('server response : ' + data.serverMessage);
        this.refreshyourquestion();
    },
    error => {
        alert('server response : ' + error);
    }

    );
  }


  //Retrieve data for perticuler user id...
  refreshyourquestion() {

    this.loginservice.callbackforlogin.emit('sent data...');

    this.serverservice.yourQuestionFetch(this.askedby).subscribe(
      data => {
        this.yourquestions = data;
        this.yourquestions.reverse();
      },
      error => {
        alert('server respond with '+error);
      },
    );
  }


}
