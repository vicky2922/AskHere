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


  getSession(){
    return this.http.get('/getsession').map(res => res.json());
    //return this.http.get('/getsession').map(res => res.json());
  }

  getIP(){
    return this.http.get('/getip').map(res => res.json());
  }
  deleteSession(id:string){
    return this.http.delete('/deletesession/'+id).map(res => res.json());
  }


  //To check if Question is alredy asked or not
  canTakeQuestion(value: string) {
    return this.http.get('/questioncheck/' + value).map(res => res.json());
  }

  //To add Question in database to admin side
  addQuestion(questionObject: QuestionObject){
    return this.http.post('/addquestion', questionObject).map(res => res.json());
  }

  //Delete Question by admin
  DeleteQuestionByAdmin(value: string){
    return this.http.delete('/deletequestionbyadmin/'+ value).map(res => res.json());
  }

  //To add Question in database to web
  addQuestionToWeb(questionObject: QuestionObject){
    return this.http.post('/addquestiontoweb', questionObject).map(res => res.json());
  }

  //Retrieve all Question from database
  allQuestionFetch(){
    return this.http.get('/fetchallquestion').map(res => res.json());
  }

  //Retrieve all Question from admin table database
  adminQuestionFetch(){
    return this.http.get('/fetchadminquestion').map(res => res.json());
  }

  //Retrieve all answer from admin table database
  adminAnswerFetch(){
    return this.http.get('/fetchadminanswer').map(res => res.json());
  }

  //Delete Answer by admin
  DeleteAnswerByAdmin(value: string){
    return this.http.delete('/deleteanswerbyadmin/'+ value).map(res => res.json());
  }

  //Approve answer by admin
  ApproveAnswerByAdmin(value:string){
    return this.http.put('/approveanswerbyadmin/'+ value, true).map(res => res.json());
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

  //update question after vote
  updateQuestion(questionObject: QuestionObject, qid: string){
    return this.http.put('/updatequestion/'+qid , questionObject).map(res => res.json());
  }

  //fetch question detail for admin
  fetchquestiondetailforadmin(value: string){
    return this.http.get('/fetchthisquestionforadmin/'+value).map(res => res.json());
  }

  //Add Answer to db
  addAnswer(answerObject: AnswerObject){
    return this.http.post('/addanswer', answerObject).map(res => res.json());
  }

  //Retrieve Answer for perticular question from db
  AnswerofQuestion(value: string){
    return this.http.get('/fetchqanswer/'+value).map(res => res.json());
  }
//Related question retrival at admn side for perticular question from db
  RelatedQuestion(value: string){
    return this.http.get('/fetchrelatedquestions/'+value).map(res => res.json());
  }







  //Search stuff.........................

  getQuestionSuggestions(value:string){
    return this.http.get('/getQuestionSuggestions/'+value).map(res => res.json());
  }

  getUserSuggestions(value:string){
    return this.http.get('/getUserSuggestions/'+value).map(res => res.json());
  }

  SearchQuestionByQ(value:string){
    return this.http.get('/SearchQuestionByQ/'+value).map(res => res.json());
  }

  SearchQuestionByType(value:string){
  return this.http.get('/SearchQuestionByType/'+value).map(res => res.json());
  }

  SearchQuestionByAsk(value:string){
    return this.http.get('/SearchQuestionByAsk/'+value).map(res => res.json());
  }


}
