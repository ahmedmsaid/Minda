import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-assigninfo',
  templateUrl: './assigninfo.component.html',
  styleUrls: ['./assigninfo.component.scss']
})
export class AssigninfoComponent {
  deatils:any
  token:any
  info:any
  id:any
  courseId: any;
  aId: any;
  quizMark:any
  file: any;
  selectedFile:any
  constructor(private router: Router, private route: ActivatedRoute, private CourseService: CourseService, private auth: AuthService, private sanitizer: DomSanitizer) { 
  }
   ngOnInit(){
    this.token=this.auth.getUserToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.aId = this.route.snapshot.paramMap.get('aid')!;
    this.getInfo(this.courseId,this.info.id,this.aId)
    console.log(this.deatils)
    console.log(this.aId)
  }
  getInfo(Cid: string,uid: string,aid:string){
    this.CourseService.getDetailAssignmentforuser(Cid,uid,aid)
  .subscribe((data: any)=>{
      this.deatils = data
      // this.file=this.sanitizer.bypassSecurityTrustResourceUrl(data.file);
      console.log(data.file)
      
  })
  }
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(assignmentform: NgForm) {
    const formdata = new FormData();
    formdata.append('answerFile', this.selectedFile);
    if (assignmentform.value.file === '') {
        const correctSpan = document.getElementById('Correct');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
          console.log(formdata);
        }
      }else{
        this.makeAssignment(formdata, this.courseId,this.aId)
        console.log(formdata);
      }
  }
  makeAssignment(formValue: any, cId: string, aId: string) {
    this.CourseService.answerAssignment(formValue,cId,aId).subscribe(() => {});
    this.router.navigate(['/Overviewcoursesprof',cId])}
  
}
