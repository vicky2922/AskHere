/**
 * Created by Vicky on 7/6/2017.
 */
export class AnswerObject {

  answer:string;
  askedby:string;
  approved:boolean;
  ofqueid:string;
  constructor(answer:string,askedby:string,ofquesid:string,approved:boolean){
    this.answer=answer;
    this.askedby=askedby;
    this.ofqueid=ofquesid;
    this.approved=approved;
  }
}
