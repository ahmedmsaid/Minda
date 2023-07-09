import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent {
  cId:any
  token:any
  info:any
  selectedFile:any
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getProfToken()
    this.info = jwtDecode(this.token)
    this.cId=this.route.snapshot.paramMap.get('id')!;
    console.log("cid"+this.cId)
  }
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(assignmentform: NgForm) {
    
    const formdata = new FormData();
    formdata.append('title', assignmentform.value.title);
    formdata.append('description', assignmentform.value.description);
    formdata.append('assignmentFile', this.selectedFile);
    if (assignmentform.value.title ==='' || assignmentform.value.description === '' || assignmentform.value.file === '') {
        const correctSpan = document.getElementById('Correct');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
          console.log(formdata);
        }
      }else{
        this.makeAssignment(formdata, this.cId)
        console.log(formdata);
      }
  }
  makeAssignment(formValue: any, cId: string) {

    this.courseService.addAssignment(formValue,cId).subscribe(() => {
    this.router.navigate(['/Overviewcoursesprof',this.cId])
  });}
}
