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
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CourseService } from './CourseService';
import { LecComponent } from './lec/lec.component';
import { UserService } from './user.service';
import { ProfileDocComponent } from './profile-doc/profile-doc.component';
import { QuizDocComponent } from './quiz-doc/quiz-doc.component';
import { DetaillsComponent } from './detaills/detaills.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { EditProfileImageComponent } from './edit-profile-image/edit-profile-image.component';
import { EditlecComponent } from './editlec/editlec.component';
import { EditlecvideoComponent } from './editlecvideo/editlecvideo.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AnsAssignmentComponent } from './ans-assignment/ans-assignment.component';
import { AnsAssignmentDegComponent } from './ans-assignment-deg/ans-assignment-deg.component';
import { AssigndetailsComponent } from './assigndetails/assigndetails.component';
import { AssigninfoComponent } from './assigninfo/assigninfo.component';
import { ForgetpassDocComponent } from './forgetpass-doc/forgetpass-doc.component';
import { AdminControllerComponent } from './admin-controller/admin-controller.component';
import { AdminService } from './Admin.Service';
import { AuthInterceptor } from './auth.interceptor';
import { EditprofileprofComponent } from './editprofileprof/editprofileprof.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'profcourses', component: ProfcoursesComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginprof', component: LoginprofComponent },
  { path: 'Signupprof', component: SignupprofComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'editprofileprof', component: EditprofileprofComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'courses/overviewcourses/:id/quiz/:Qid/result', component: ProfileDocComponent },
  { path: 'overviewcourses/:id', component: OverviewcoursesComponent },
  { path: 'Overviewcoursesprof/:id', component: OverviewcoursesprofComponent },
  { path: 'courses/overviewcourses/:id/quiz/:Qid', component: QuizComponent },
  { path: 'profcourses/Overviewcoursesprof/:id/quiz/:Qid', component: QuizDocComponent },
  { path: 'profcourses/Overviewcoursesprof/:id/lecture/:Lid', component: LectureComponent },
  { path: 'profcourses/Overviewcoursesprof/:id/lecture/:Lid/edit', component: EditlecComponent },
  { path: 'profcourses/:id/edit', component: EditCoursesComponent },
  { path: 'courses/overviewcourses/:id/lec/:Lid', component: LecComponent },
  { path: 'profcourses/Addcourse', component: AddcourseComponent },
  { path: 'profcourses/Overviewcoursesprof/:id/addlecture', component: AddlectureComponent },
  { path: 'addlecture2', component: Addlecture2Component },
  { path: 'forgetpass', component: ForgetpassComponent },
  { path: 'forgetpassDoc', component: ForgetpassDocComponent },
  { path: 'profcourses/Overviewcoursesprof/:id/quizprof' , component: QuizprofComponent },
  { path: 'profcourses/Overviewcoursesprof/:id/assignment' , component: AddAssignmentComponent },
  { path: 'courses/overviewcourses/:id/assignment/:aid/upload' , component: AnsAssignmentComponent },
  { path: 'profcourses/Overviewcoursesprof/:id/quiz/:Qid/deataills',component:DetaillsComponent},
  { path: 'profcourses/Overviewcoursesprof/:id/assignment/:aid/deg',component:AnsAssignmentDegComponent},
  { path: 'profcourses/Overviewcoursesprof/:id/assignment/:aid/deataills',component:AssigndetailsComponent},
  { path: 'courses/overviewcourses/:id/assignment/:aid/deatails',component:AssigninfoComponent},
  { path :'AdminController',component:AdminControllerComponent}
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
    LecComponent,
    ProfileDocComponent,
    QuizDocComponent,
    DetaillsComponent,
    EditCoursesComponent,
    EditProfileImageComponent,
    EditlecComponent,
    EditlecvideoComponent,
    AddAssignmentComponent,
    AnsAssignmentComponent,
    AnsAssignmentDegComponent,
    AssigndetailsComponent,
    AssigninfoComponent,
    ForgetpassDocComponent,
    AdminControllerComponent,
    EditprofileprofComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    CourseService,
    UserService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
