import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { tap } from 'rxjs';
import { AuthService } from '../auth.service';

interface Course {
  doctorData: {
    firstName: string,
    doctorId: string
  }
  _id: string
  courseName: string
  description: string
  lectureId: [{
    _id: string
    title: string
  }],
  quizzes: [{
    _id: string
    quizname: string
  }],
}

@Component({
  selector: 'app-overviewcoursesprof',
  templateUrl: './overviewcoursesprof.component.html',
  styleUrls: ['./overviewcoursesprof.component.scss']
})

export class OverviewcoursesprofComponent implements OnInit {
  courses!: Course
  CoursesComponent: any;
  token = this.auth.getToken()
  info: any
  id: any
  assignments:any
  courseId=this.route.snapshot.paramMap.get('id')!;
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) {
    this.info=jwtDecode(this.token);
    // this.id=this.info.id
   }
  ngOnInit(){
    var id = this.route.snapshot.paramMap.get('id')!;
    this.getInfoDoc(id)
    this.getAssign(this.courseId,this.info.id)
    console.log(id)
    console.log(this.courses)
  }
  getInfoDoc(id: string){
    this.courseService.getCourseInfoDoc(id)
    .subscribe((data: any)=>{
      this.courses = data
  })
  console.log(this.courses)
  }
  getAssign(cid: string,did: string){
    this.courseService.getAssignmentdoc(cid,did)
    .subscribe((data: any)=>{
      this.assignments = data
  })
  console.log(this.courses)
  }
  start(Cid: string,Lid: string) {
    this.router.navigate([`profcourses/Overviewcoursesprof/${Cid}/lecture/${Lid}`]);
  }
  quiz() {
    this.router.navigate([`profcourses/Overviewcoursesprof/${this.courseId}/quizprof`]);
  }
  assignment(){
    this.router.navigate([`profcourses/Overviewcoursesprof/${this.courseId}/assignment`]);
  }
  Lesson() {
    this.router.navigate([`profcourses/Overviewcoursesprof/${this.courseId}/addlecture`]);////////
  }
  onLecClick(Cid: string,Lid: string) {
    this.router.navigate([`profcourses/Overviewcoursesprof/${Cid}/lecture/${Lid}`]);/////
  }
  onQuizClick(Cid: string,Qid: string) {
    this.router.navigate([`profcourses/Overviewcoursesprof/${Cid}/quiz/${Qid}`]);/////
  }
  onQuizDetaillClick(Cid: string,Qid: string) {
    this.router.navigate([`profcourses/Overviewcoursesprof/${Cid}/quiz/${Qid}/deataills`]);/////
  }
  onQuizDeleteClick(Qid: string) {
    console.log(Qid)
    this.deleteQuizz(Qid)
  }
  onAssignmentClick(Cid: string,Qid: string) {
    this.router.navigate([`profcourses/Overviewcoursesprof/${Cid}/assignment/${Qid}/deg`]);/////profcourses/Overviewcoursesprof/:id/assignment/:aid/deg
  }
  onAssignmentDetaillClick(Cid: string,aid: string) {
    this.router.navigate([`profcourses/Overviewcoursesprof/${Cid}/assignment/${aid}/deataills`]);//profcourses/Overviewcoursesprof/:id/assignment/:aid/deataills
  }
  onAssignmentDeleteClick(Qid: string) {
    console.log(Qid)
    this.deleteQuizz(Qid)
  }
  onLecDeleteClick(Cid: string,Lid: string) {
    this.deleteLec(Lid,Cid)
  }
  onLecEditClick(Cid: string,Lid: string) {
    this.router.navigate([`profcourses/Overviewcoursesprof/${Cid}/lecture/${Lid}/edit`]);/////
  }

  deleteLec(Lid: string,Cid: string){
    this.courseService.deleteLec(Lid,Cid).subscribe(()=>{
      window.location.reload();
    })
  }
  deleteQuizz(Qid: string){
    this.courseService.deleteQuiz(Qid).subscribe(()=>{
      window.location.reload();
    })
  }
  Content() {}
  Description(){}
  Discussion(){}
}
