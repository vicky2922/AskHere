import { Component, OnInit } from '@angular/core';
import {ServerserviceService} from "../service/serverservice.service";
/*import { QuestionCompnent } from './app/question/question.component';*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions = [];


  constructor(private serverservice : ServerserviceService) { }

  ngOnInit() {
    this.refresh();

  }

  refresh() {
    this.serverservice.allQuestionFetch().subscribe(
      data => {
        this.questions = data;
        this.questions.reverse();
    },
    error => {
        alert('server respond with '+error);
    },
    );
  }

}
