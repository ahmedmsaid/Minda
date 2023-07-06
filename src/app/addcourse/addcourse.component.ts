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

  constructor(private router: Router, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getProfToken()
    this.info = jwtDecode(this.token)
  }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(addcourseForm: NgForm) {
      const formData = {
        courseName: addcourseForm.value.name,
        description: addcourseForm.value.description
      };

      if (addcourseForm.value.name ==='' || addcourseForm.value.description === '') {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
            console.log(formData);
          }
        }else{
          this.addCourse(formData, this.info.id)
          console.log(formData);
        }
    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    // this.router.navigate(['/courses']);
    // console.log(formData);
  }

  addCourse(formValue: any, id: string) {
    this.courseService.addCourse(formValue, id).subscribe(() => {
      this.router.navigate(['/profcourses'])
    });
  }
}
