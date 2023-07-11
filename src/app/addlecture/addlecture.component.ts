import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addlecture',
  templateUrl: './addlecture.component.html',
  styleUrls: ['./addlecture.component.scss']
})

export class AddlectureComponent {
  cId:any
  token:any
  info:any
  errorMessage: string = ''
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getProfToken()
    this.info = jwtDecode(this.token)
    this.cId=this.route.snapshot.paramMap.get('id')!;
  }
  onSubmit(addlectureForm: NgForm) {
    const formData = {
      title: addlectureForm.value.name,
      description: addlectureForm.value.description,
    };
    if (addlectureForm.value.name ==='' || addlectureForm.value.description === '' ) {
      const correctSpan = document.getElementById('checked');
      if (correctSpan !== null) {
        correctSpan.innerText = 'All Fileds Are Required';
      }
    }else{
      this.addLec1(formData,this.cId, this.info.id)
    }
  }
  addLec1(formValue: any, cId: string,id: string ) {
    this.courseService.addLec1(formValue,cId ,id).subscribe(() => {
    this.router.navigate(['/Overviewcoursesprof',this.cId])
  },(error: any) => {
    console.error('Error in addCourse', error);
    // Set the error message
    this.errorMessage = error;
    console.log(this.errorMessage)
  }
  );}
}
