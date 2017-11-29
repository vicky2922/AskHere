import { Component, OnInit } from '@angular/core';
import {ServerserviceService} from "../service/serverservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  questions = [];
  answers = [];

  constructor(private route2 : Router,private serverservice : ServerserviceService) { }

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

  //Approve answer by admin
  ApproveAnswer(id:string){
    this.serverservice.ApproveAnswerByAdmin(id).subscribe(
        data => {
          alert('server response : ' + data.serverMessage);
        },
      error => {
          alert('server response : ' + error);
      }
    );
    this.route2.navigate(['admin']);
    this.refresh();
  }



  //Delete Answer by admin...
  RemoveAnswer(id:string){
    this.serverservice.DeleteAnswerByAdmin(id).subscribe(
      data => {
        alert('server response : ' + data.serverMessage);
        // this.refreshyourquestion();
      },
      error => {
        alert('server response : ' + error);
      }

    );
    this.route2.navigate(['admin']);
    this.refresh();
  }


}
