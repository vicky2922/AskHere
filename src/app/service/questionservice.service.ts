/**
 * Created by Vicky on 7/3/2017.
 */
import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable ()
export class QuestionService {

  constructor(private http: Http) {
  }

  getAllQuestions() {
    return this.http.get('/question')
      .map(res => res.json());

  }
}
