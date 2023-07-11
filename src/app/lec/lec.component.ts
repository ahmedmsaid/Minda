import { Component } from '@angular/core';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import { map, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
interface Lec {
  doctorData: {
    doctorName: string,
    doctorId: string
  }
  courseData: {
    courseName: string,
    courseId: string
  },
  _id: string
  title: string
  description: string
  vedios: [{
    _id: string
    public_id: string
    url: string
    duration: string
  }],
  decument: [],
  img: [],
}

@Component({
  selector: 'app-lec',
  templateUrl: './lec.component.html',
  styleUrls: ['./lec.component.scss']
})
export class LecComponent {
  lec!: Lec
  description:any
  cname:any
  lectureId: any
  courseId: any
  userId: any
  token: any
  info: any
  video:any
  showAddVideos: boolean = false;
  constructor(private courseService: CourseService, private auth: AuthService, private route: ActivatedRoute) {
    this.token = this.auth.getToken()
  }

  ngOnInit(){
    this.info = jwtDecode(this.token)
    this.userId = this.info.id
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.lectureId = this.route.snapshot.paramMap.get('Lid')!;
    this.getLec(this.lectureId ).subscribe((lec: Lec) => {
      this.lec = lec;
      if (!this.lec.vedios[0]?.url) {
        this.video = "";
        this.showAddVideos = true;
      } else {
        this.video = this.lec.vedios[0].url;
      }
    });
  }
  getLec(lId: string){
      return this.courseService.getLecUser(lId).pipe(
        tap((data: any) => {
          this.description = data.lecture.description;
          this.cname = data.lecture.courseData.courseName;
        }),
        map((data: any) => data.lecture)
      );
 }
}
