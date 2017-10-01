import { Component, OnInit } from '@angular/core';
import {ServerserviceService} from "../service/serverservice.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  questions = [];

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
  }

}
