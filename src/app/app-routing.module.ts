/**
 * Created by Vicky on 6/27/2017.
 */
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import { QuestionComponent } from './question/question.component';
import { OnlyquestionComponent } from './question/onlyquestion/onlyquestion.component';
import {AnswerComponent} from "./answer/answer.component";




const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enter', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: 'question', component: QuestionComponent},
  {path: 'answer/:id', component: AnswerComponent},

  { path: '**', redirectTo: '/not-found'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
