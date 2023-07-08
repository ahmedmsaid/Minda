import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
})
export class EditCoursesComponent {
  token: any
  info: any
  course:any
  constructor(private router: Router, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getProfToken()
    this.info = jwtDecode(this.token)
  }
    onSubmit(updatecourseForm: NgForm) {
      const formData = {
        courseName: updatecourseForm.value.name,
        description: updatecourseForm.value.description
      };

      if (updatecourseForm.value.name ==='' || updatecourseForm.value.description === '') {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
            console.log(formData);
          }
        }else{
          this.updateCourse(formData, this.info.id)
          console.log(formData);
        }
  }

  updateCourse(formValue: any, id: string) {
    this.courseService.addCourse(formValue, id).subscribe(() => {
      this.router.navigate(['/Overviewcoursesprof', id]);
    });
  }
}
