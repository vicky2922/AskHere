import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  percentage:string = '40%';

  constructor() { }

  ngOnInit() {
  }
  getpercentage(){
    return this.percentage;
  }
}
