import { Component, OnInit } from '@angular/core';
import {ServerserviceService} from "../service/serverservice.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  questions = [];
  answers = [];

  constructor(private serverservice : ServerserviceService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.serverservice.adminQuestionFetch().subscribe(
      data => {
        this.questions = data;
        this.questions.reverse();
      },
      error => {
        alert('server respond with '+error);
      },
    );

    this.serverservice.adminAnswerFetch().subscribe(
      data => {
        this.answers = data;
        this.answers.reverse();
      },
      error => {
        alert('server respond with '+error);
      },
    );
  }

}
