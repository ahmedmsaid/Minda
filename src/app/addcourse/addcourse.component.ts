import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})

export class AddcourseComponent {

  token: any
  info: any
  errorMessage: string = ''

  constructor(private router: Router, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getToken()
    this.info = jwtDecode(this.token)
  }
  onSubmit(addcourseForm: NgForm) {
    const formData = {
      courseName: addcourseForm.value.name,
      description: addcourseForm.value.description
    };

    if (addcourseForm.value.name ==='' || addcourseForm.value.description === '') {
      const correctSpan = document.getElementById('checked');
      if (correctSpan !== null) {
        correctSpan.innerText = 'All Fileds Are Required';}
    }else{
      this.addCourse(formData, this.info.id)
    }
  }

  addCourse(formValue: any, id: string) {
    this.courseService.addCourse(formValue, id).subscribe(
      () => {
        // Navigate to the desired page on success
        this.router.navigate(['/profcourses'])
      },
      (error: any) => {
        console.error('Error in addCourse', error);
        // Set the error message
        this.errorMessage = error;
        console.log(this.errorMessage)
      }
    );
  }
    // this.router.navigate(['/profcourses'])
  }
