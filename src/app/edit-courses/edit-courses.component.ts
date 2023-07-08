import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  cId:any
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getProfToken()
    this.info = jwtDecode(this.token)
    this.cId=this.route.snapshot.paramMap.get('id')!;
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
          this.editCourse(formData, this.cId)
          console.log(formData);
        }
  }
  editCourse(formValue: any, id: string) {
    this.courseService.updateCourse(formValue, id).subscribe(() => {
      // this.router.navigate(['/Overviewcoursesprof', id]);
    });
  }
}
