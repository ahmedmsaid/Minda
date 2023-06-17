import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoginprofComponent } from './loginprof/loginprof.component';
import { SignupComponent } from './signup/signup.component';
import { SignupprofComponent } from './signupprof/signupprof.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { AddlectureComponent } from './addlecture/addlecture.component';
import { Addlecture2Component } from './addlecture2/addlecture2.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfcoursesComponent } from './profcourses/profcourses.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizprofComponent } from './quizprof/quizprof.component';
import { RouterModule, Routes } from '@angular/router';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { OverviewcoursesComponent } from './overviewcourses/overviewcourses.component';
import { OverviewcoursesprofComponent } from './overviewcoursesprof/overviewcoursesprof.component';
import { LectureComponent } from './lecture/lecture.component';
import { HomeComponent } from 'src/home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'profcourses', component: ProfcoursesComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginprof', component: LoginprofComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'overviewcourses', component: OverviewcoursesComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'lecture', component: LectureComponent },
  { path: 'addlecture', component: AddlectureComponent },
  { path: 'addlecture2', component: Addlecture2Component },
  { path: 'forgetpass', component: ForgetpassComponent },
];

@NgModule({
  
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LoginprofComponent,
    SignupComponent,
    SignupprofComponent,
    ForgetpassComponent,
    AddcourseComponent,
    AddlectureComponent,
    Addlecture2Component,
    CoursesComponent,
    ProfcoursesComponent,
    ProfileComponent,
    QuizComponent,
    QuizprofComponent,
    EditprofileComponent,
    OverviewcoursesComponent,
    OverviewcoursesprofComponent,
    LectureComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
