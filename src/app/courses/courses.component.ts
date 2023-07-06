import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { ICourse } from '../course.model';
import { tap } from 'rxjs';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent {
  courses!: any
  
  //dummy!: ICourse[]

  token = this.auth.getUserToken()
  data: any
  id: any

  constructor(private router: Router, private courseService: CourseService, private auth: AuthService) { }

  ngOnInit() {
    this.data = jwtDecode(this.token)
    this.id = this.data.id

      this.courseService.getCourses(this.id, this.token)
      .pipe(tap( (data: any) => {
        this.courses = <ICourse>data['enrolledCourses']
    }))
    .subscribe()

    console.log(this.token)
  }

  onCourseClick(id: string) {
    this.router.navigate(['/overviewcourses', id]);
  }

  /*getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }*/
}
