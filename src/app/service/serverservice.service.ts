import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {newRegistration} from "../register/register.component";
import {LoginObject} from "../login/login.component";
import {QuestionObject} from "../Objects/questionobject";
import {AnswerObject} from "../Objects/answerobject";

@Injectable()
export class ServerserviceService {

  constructor(private http: Http) { }


  //New User insertion operation
  addNewUser(userObject: newRegistration) {
    console.log("MongoService-:addNewUser");
    return this.http.post('/newUserReg', userObject).map(res => res.json());
  }

  //To check if username is already used or not
  canTakeUserName(value: string) {
    return this.http.get('/usernamecheck/' + value).map(res => res.json());
  }

  //To check if Email is already used or not
  canTakeEmail(value: string) {
    return this.http.get('/emailcheck/' + value).map(res => res.json());
  }

  //login process->credential check
  canLogin(loginObject: LoginObject) {
    console.log("MongoServiceConsole-:Login Attempt");
    return this.http.post('/userLogin', loginObject).map(res => res.json());
  }

  //To check if Question is alredy asked or not
  canTakeQuestion(value: string) {
    return this.http.get('/questioncheck/' + value).map(res => res.json());
  }

  //To add Question in database
  addQuestion(questionObject: QuestionObject){
    return this.http.post('/addquestion', questionObject).map(res => res.json());
  }

  //Retrieve all Question from database
  allQuestionFetch(){
    return this.http.get('/fetchallquestion').map(res => res.json());
  }

  //Retrieve question for perticular user id
  yourQuestionFetch(value: string){
    return this.http.get('/fetchyourquestion/' + value).map(res => res.json());
  }

  //Delete Question by user from question tab
  DeleteQuestion(value: string){
    return this.http.delete('/deletequestion/'+ value).map(res => res.json());
  }

  //fetch question detail for answer
  fetchquestiondetailforanswer(value: string){
    return this.http.get('/fetchthisquestion/'+value).map(res => res.json());
  }

  //Add Answer to db
  addAnswer(answerObject: AnswerObject){
    return this.http.post('/addanswer', answerObject).map(res => res.json());
  }

  //Retrieve Answer for perticular question from db
  AnswerofQuestion(value: string){
    return this.http.get('/fetchqanswer/'+value).map(res => res.json());
  }


}
