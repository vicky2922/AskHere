/**
 * Created by Vicky on 7/6/2017.
 */
export class AnswerObject {

  answer:string;
  askedby:string;
  ofqueid:string;
  constructor(answer:string,askedby:string,ofquesid:string){
    this.answer=answer;
    this.askedby=askedby;
    this.ofqueid=ofquesid;
  }
}
