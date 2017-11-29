import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerserviceService} from "../service/serverservice.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-searchstuff',
  templateUrl: './searchstuff.component.html',
  styleUrls: ['./searchstuff.component.css']
})
export class SearchstuffComponent implements OnInit {
  questions = [];
  questionst = [];
  questionsa = [];
  searchKey:string;
  searchby:string = 'question';
  SearchForm:FormGroup;
  searchfound:boolean = false;
  searchfoundt:boolean = false;
  searchfounda:boolean = false;




  constructor(private route: ActivatedRoute,private serverservice: ServerserviceService,private route2: Router) {
    this.questions = [{_id:'none', question:'dummy', type:'',askedby:''}];
    this.questionst = [{_id:'none', question:'dummy', type:'',askedby:''}];
    this.questionsa = [{_id:'none', question:'dummy', type:'',askedby:''}];
    this.route.params.subscribe(
      (param: Params)=> {
        this.searchKey = param['id'];
      }
    );

    this.SearchForm = new FormGroup({
      'Search': new FormControl(this.searchKey,[Validators.required]),
    });
  //  alert(this.searchKey);

    this.fetchfromQuestion(this.searchKey);
    this.searchByType(this.searchKey);
    this.searchByAsk(this.searchKey);
  }

  inFetch(){
    this.searchKey=this.SearchForm.get('Search').value;
   // alert(this.searchKey);
    this.route2.navigate(['/search/'+this.searchKey]);
  }


  ngOnInit() {

  }

  fetchfromQuestion(searchforquestion:string){
   // this.appear=true;

    this.searchby='question';
    this.serverservice.SearchQuestionByQ(searchforquestion).subscribe(
      data => {
        this.questions = data;
     //   this.appear=false;
        if(this.questions.length >0){
          this.searchfound=true;
        }else{
          this.searchfound=false;
        }
      }
    );
  }

  searchByType(searchforquestion:string){
   // this.appear=true;
    this.searchby='Type';
    this.serverservice.SearchQuestionByType(searchforquestion).subscribe(
      data => {
        this.questionst = data;
      //  this.appear=false;
        if(this.questionst.length >0){
          this.searchfoundt=true;
        }else{
          this.searchfoundt=false;
        }
      }
    );
  }

  searchByAsk(searchforquestion:string){
    // this.appear=true;
    this.searchby='Asker';
    this.serverservice.SearchQuestionByAsk(searchforquestion).subscribe(
      data => {
        this.questionsa = data;
        //  this.appear=false;
        if(this.questionsa.length >0){
          this.searchfounda=true;
        }else{
          this.searchfounda=false;
        }
      }
    );
  }

}
