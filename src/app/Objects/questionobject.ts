/**
 * Created by Vicky on 7/4/2017.
 */
export class QuestionObject {
  question:string;
  type:string;
  askedby:string;
  upvoted = [];
  constructor(question:string,type:string,askedby:string,upvoted = []){
      this.question=question;
      this.type=type;
      this.askedby=askedby;
      this.upvoted=upvoted;
  }
}
