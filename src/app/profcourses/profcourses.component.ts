import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { tap } from 'rxjs';

@Component({
  selector: 'app-profcourses',
  templateUrl: './profcourses.component.html',
  styleUrls: ['./profcourses.component.scss']
})
export class ProfcoursesComponent {
  public courses!: Course[]

  token = this.auth.getProfToken()
  data: any
  id: any

  constructor(private router: Router, private auth: AuthService, private courseService: CourseService) { 

  }


  ngOnInit(){
    this.data = jwtDecode(this.token)
    this.id = this.data.id

      this.courseService.getManagedCourses(this.id, this.token)
      .pipe(tap( (data: any) => {
        this.courses = data['courses']
    }))
    .subscribe()
  }

  add() {
    this.router.navigate(['profcourses/Addcourse']);
  }
  
  onCourseClick(id: number) {
    this.router.navigate(['/Overviewcoursesprof', id]);
  }
  onCourseDeleteClick(id: number) {
    this.courseService.deleteCourse(id).subscribe(()=>{})
  }
  onCourseEditClick(Cid: number) {
    // this.courseService.updateCourse(Cid).subscribe(()=>{})
    this.router.navigate([`profcourses/${Cid}/edit/`]);
  }
  
}

interface Course {
  _id: number;
  courseName: string;
  description: string;
  duration: string;
  averageRating?: number
}
