import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {CoursesComponent} from '../courses/courses.component';
import { CourseService } from '../CourseService';
import { tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';
// interface Course {
//   id: number;
//   title: string;
//   Description: string;
//   authorName: string;
// }

interface Lesson {
  name: string;
  time: string;
}

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
  assignments: [{
    _id: string
    title: string
    description:string
    file:string
  }],
}

  

@Component({
  selector: 'app-overviewcourses',
  templateUrl: './overviewcourses.component.html',
  styleUrls: ['./overviewcourses.component.scss']
})

export class OverviewcoursesComponent implements OnInit {
  course!: Course
  CoursesComponent: any;
  info:any
  assign:any
  token = this.auth.getUserToken()
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.info=jwtDecode(this.token);
  }
  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')!;
    // this.getCourse(id)
    this.getInfo(id)
    // this.getAssigns(id,this.info.id)
    console.log(id)
    console.log(this.course)
  }
  getInfo(id: string){
    this.courseService.getCourseInfo(id)
    .subscribe((data: any)=>{
      this.course = data
    })
  console.log("dddd"+this.course)
  }
  getAssigns(cid: string,uid: string){
    this.courseService.getAssignmentforuser(cid,uid)
    .subscribe((data: any)=>{
      this.assign = data
    })
  console.log("dddd"+this.course)
  }
  start(Cid: string,Lid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/lec/${Lid}`]);
  }
  quiz() {
    this.router.navigate(['/quiz']);
  }
  onLecClick(Cid: string,Lid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/lec/${Lid}`]);/////
  }
  onQuizClick(Cid: string,Lid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/quiz/${Lid}`]);/////
  }
  onAssignmentClick(Cid: string,aid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/assignment/${aid}/deatails`]);
    // this.router.navigate([`courses/overviewcourses/${Cid}/assignment/${aid}/upload`]);/////courses/overviewcourses/:id/assignment/:aid
  }
  
    @ViewChild('content') content!: ElementRef;
    Content() {
      // const newContent = `
      //   <table class="my-table">
      //     <tr *ngFor="let row of data">
      //       <td>{{ row.name }}</td>
      //       <td>{{ row.time }}</td>
      //     </tr>
      //   </table>
      // `;
      // if (this.content) {
      //   const safeContent: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(newContent);
      //   this.content.nativeElement.innerHTML = newContent;
      // }
    }
    Description(){
    //   const newContent = ` <p>{{ course.Description }}</p> `;
    // if (this.content) {
    //   this.content.nativeElement.innerHTML = newContent;
    // }
  }
    
    Discussion(){}
}
