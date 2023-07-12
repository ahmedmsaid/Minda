import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {CoursesComponent} from '../courses/courses.component';
import { CourseService } from '../CourseService';
import { tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-overviewcourses',
  templateUrl: './overviewcourses.component.html',
  styleUrls: ['./overviewcourses.component.scss']
})

export class OverviewcoursesComponent implements OnInit {
  course: any
  CoursesComponent: any;
  info:any
  assign:any
  cId:any
  posts:any
  profile:any
  image:any
  imge:any
  returnedimg:any
  returnedimgcomment:any
  showElement: boolean = false;
  showIcon: boolean = true;
  showDelete: boolean = true;
  showimgpost:boolean=false;
  showimgcomment:boolean=false;
  token = this.auth.getToken()
  constructor(private router: Router, private route: ActivatedRoute, private userServiuce: UserService,private courseService: CourseService, private auth: AuthService) { 
    this.info=jwtDecode(this.token);
  }
  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')!;
    this.cId=this.route.snapshot.paramMap.get('id')!;
    this.getInfo(id)
    this.getProfile(this.info.id)
    this.iconpost()
    this.iconcomment()
  }
  getInfo(id: string){
    this.courseService.getCourseInfo(id)
    .subscribe((data: any)=>{
      this.course = data
      if(this.course.posts.user.profileimg.url=== " "){
        this.showimgpost=true
      }
      if(this.course.posts.comments.user.profileimg.url=== " "){
        this.showimgcomment=true
      }      
  })
}
  getAssigns(cid: string,uid: string){
    this.courseService.getAssignmentforuser(cid,uid)
    .subscribe((data: any)=>{
      this.assign = data
  })}
  getProfile(id: string){
    this.userServiuce.getInfo(id)
  .subscribe((data: any)=>{
      this.profile = data.firstName
  })}
  iconpost(){
    if(this.profile != this.course.posts.user.firstName){
      this.showIcon = false;
      console.log(this.profile +''+ this.course.posts.user.firstName)
    }
  }
  iconcomment(){
    if(this.profile != this.course.posts.comments.user.firstName){
      this.showDelete = false;

    }
    console.log(this.profile +''+ this.course.posts.user.firstName)
  }
  getPosts(id: string){
    this.courseService.getPost(id)
    .subscribe((data: any)=>{
      this.posts = data
  })}
  onSubmit(addPostForm: NgForm) {
    const post = {
      content: addPostForm.value.content,
    };
    if (addPostForm.value.content ==='' ) {
      const correctSpan = document.getElementById('checked');
      if (correctSpan !== null) {
        correctSpan.innerText = 'All Fileds Are Required';
      }
    }else{
      this.post(post,this.cId)
    }
}
onSubmitcomment(addCommentForm: NgForm,pid:string) {
  const commentvalue = {
    content: addCommentForm.value.comment,
  };
  if (addCommentForm.value.comment ==='' ) {
    const correctSpan = document.getElementById('error');
    if (correctSpan !== null) {
      correctSpan.innerText = 'content is Required';
    }
  }else{
    this.comment(commentvalue,this.cId,pid)
  }
}
post(formValue: any, id: string ) {
  this.courseService.addPost(formValue,id).subscribe(()=> {
    window.location.reload();
  });

}
comment(formValue: any, cid: string,pid:string ) {
  this.courseService.addComment(formValue,cid,pid).subscribe(()=> {
    window.location.reload();
  });
}
  start(Cid: string,Lid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/lec/${Lid}`]);
  }
  quiz() {
    this.router.navigate(['/quiz']);
  }
  onLecClick(Cid: string,Lid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/lec/${Lid}`]);
  }
  onQuizClick(Cid: string,Lid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/quiz/${Lid}`]);
  }
  onAssignmentClick(Cid: string,aid: string) {
    this.router.navigate([`courses/overviewcourses/${Cid}/assignment/${aid}/deatails`]);
  }
  Content() {}
  Description(){}
  Discussion(){
    this.showElement = !this.showElement;
  }
  onDeletePost(cid:string,pid:string){
    this.deletepost(cid,pid)
  }
  onDeleteComment(id:string,pid:string,cid:string){
    this.deletecomment(id,pid,cid)
  }
  deletepost(cid: string,pid: string){
    this.courseService.deletePost(cid,pid).subscribe(()=>{
      window.location.reload();
    })
  }
  deletecomment(id:string,Lid: string,Cid: string){
    this.courseService.deleteComment(id,Lid,Cid).subscribe(()=>{
      window.location.reload();
    })
  }
}
