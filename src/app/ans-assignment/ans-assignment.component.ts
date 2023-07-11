import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-ans-assignment',
  templateUrl: './ans-assignment.component.html',
  styleUrls: ['./ans-assignment.component.scss']
})
export class AnsAssignmentComponent {
  cId:any
  aId:any
  token:any
  info:any
  selectedFile:any
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getToken()
    this.info = jwtDecode(this.token)
    this.cId=this.route.snapshot.paramMap.get('id')!;
    this.aId=this.route.snapshot.paramMap.get('aid')!;
    console.log("cid"+this.cId)
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
      }
    }else{
      this.makeAssignment(formdata, this.cId,this.aId)
    }
  }
  makeAssignment(formValue: any, cId: string,aId :string) {
    this.courseService.answerAssignment(formValue,cId,aId).subscribe(() => {
    this.router.navigate(['/Overviewcoursesprof',this.cId])
  });}
}
