import { Component } from '@angular/core';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
interface Lesson {
  name: string;
  time: string;
}

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent {
  data: Lesson[] = [
    { name: 'Course Overview', time: '5m' },
    { name: 'Lession 1', time: '30m' },
    { name: 'Lession 2', time: '35m' }
  ];

  lectures!: Lecture[]
  lectureId: any
  courseId: any
  userId: any
  token: any
  info: any
  constructor(private courseService: CourseService, private auth: AuthService, private route: ActivatedRoute) {
    this.token = this.auth.getUserToken()
  }

  /*ngOnInit(){
    this.info = jwtDecode(this.token)
    this.userId = this.info.id
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.lectureId = '6437c4dd2ca1189280a08d27'

    this.getInfo(this.userId, this.courseId, this.lectureId)
  }

  getInfo(uid: string, cid: string, lid: string){
    this.courseService.getLectureInfo(uid, cid, lid).pipe(
      tap( (data: any) => {
      this.lectures = data
  }))
  .subscribe()
  }*/
}

interface Lecture {
  public_id: string
  url: string
  duration: string
  _id: string
}
