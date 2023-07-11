import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { AdminService } from '../Admin.Service';

@Component({
  selector: 'app-admin-controller',
  templateUrl: './admin-controller.component.html',
  styleUrls: ['./admin-controller.component.scss']
})
export class AdminControllerComponent {
  token=this.auth.getUserToken()
  info:any
  Users:any
  userIncourse:any
  putcodeVisible:boolean=false
  getcodeVisible:boolean=false
  courseVisible:boolean=false
  userVisible:boolean=false
  pVisible:boolean=false
  enrollVisible:boolean=false
  userCourseVisible:boolean=false
  homeVisible:boolean=true
  responseMessage:any
  number:any
  codes:any
  courses:any
  courseId:any
  courseIdForDetail:any
  responseenroll:any
  constructor(private router: Router, private route: ActivatedRoute,private admin: AdminService, private courseService: CourseService, private auth: AuthService) { 
    // this.token = 
    this.info = jwtDecode(this.token)
  }
  ngOnInit(){
    this.getAllusers()
    this.getAllcodes()
    this.getAllcourses()
  }
  getAllusers() {
    this.admin.getusers().subscribe((data: any)=>{
      this.Users = data.allUsers})
  }
  getAllcodes() {
    this.admin.getcodes().subscribe((data: any)=>{
    this.codes = data})
  }
  getAllcourses() {
    this.admin.getcourses().subscribe((data: any)=>{
    this.courses = data.course
    console.log(this.courses)})
  }
  onSubmit() {
    console.log(this.info.id + '  '+ this.token+' '+this.info.isAdmin)
    if(this.info.isAdmin){
      this.put(this.info.id,this.token)
    }
    else{
      console.log('nooooooooooooooooooooooo')
    }
  }
  
  put(uid: string, token: string) {
    this.admin.putcode(uid,token).subscribe(
      response => {
        console.log('Special code updated successfully:', response.body.code);
        this.responseMessage=response.body.code
    },
    error => console.error('Error updating special code:', error)
  );
  }
  getuser(){
    this.userVisible = !this.userVisible;
    this.courseVisible=false
    this.getcodeVisible=false
    this.putcodeVisible=false
    this.homeVisible=false
    this.userCourseVisible=false
  }
  getcourses(){
    this.courseVisible = !this.courseVisible;
    this.userVisible=false
    this.getcodeVisible=false
    this.homeVisible=false
    this.putcodeVisible=false
    this.userCourseVisible=false
  }
  putcode(){
    this.putcodeVisible = !this.putcodeVisible;
    this.userVisible=false
    this.getcodeVisible=false
    this.homeVisible=false
    this.courseVisible=false
    this.userCourseVisible=false
  }
  getcode(){
    this.getcodeVisible = !this.getcodeVisible;
    this.userVisible=false
    this.putcodeVisible=false
    this.homeVisible=false
    this.courseVisible=false
    this.userCourseVisible=false
  }
  enroll(){

  }
  onDeleteuser(id:string){
    this.admin.deleteuser(id).subscribe(()=>{})
  }
  onCourseClick(id:string){
    this.courseId=id
    this.userVisible=false
    this.putcodeVisible=false
    this.getcodeVisible=false
    this.homeVisible=false
    this.courseVisible=false
    this.userCourseVisible=false
    this.enrollVisible=true
  }
  onCourseDetailsClick(id:string){
    // this.courseIdForDetail=id
    this.userVisible=false
    this.putcodeVisible=false
    this.getcodeVisible=false
    this.homeVisible=false
    this.courseVisible=false
    this.enrollVisible=false
    this.userCourseVisible=true
    this.getAllusersInCourse(id)
  }
  getAllusersInCourse(id:string) {
    this.admin.getusersforDetail(id).subscribe((data: any)=>{
      this.userIncourse = data.enroll})
  }
  onSubmitenroll(enrollform: NgForm) {
    const formdata= {
      email:enrollform.value.email,
    }
    if (enrollform.value.email ==='' ) {
      const correctSpan = document.getElementById('Correct');
      if (correctSpan !== null) {
        correctSpan.innerText = 'All Fileds Are Required';
      }
    }else{
      this.addstud(formdata,this.courseId)
    }
  }
  addstud(formValue: any, id: string ) {
    this.admin.enroll(formValue,id).subscribe();
    this.homeVisible=true
    this.enrollVisible=false
  }
}
