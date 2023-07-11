import { Component } from '@angular/core';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import { map, tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent {
  lec!: Lec
  description:any
  cname:any
  lectureId: any
  courseId: any
  userId: any
  token: any
  info: any
  video: any;
  showAddVideos: boolean = false;
  selectedVideoFile: any;
  errorMessage: string = ''
  constructor(private courseService: CourseService, private auth: AuthService, private route: ActivatedRoute) {
    this.token = this.auth.getProfToken()
  }

  ngOnInit(){
    this.info = jwtDecode(this.token);
    this.userId = this.info.id;
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.lectureId = this.route.snapshot.paramMap.get('Lid')!;
    this.getLec(this.lectureId, this.courseId).subscribe(lec => {
      this.lec = lec;
      if (!this.lec.vedios[0]?.url) {
        this.video = "";
        this.showAddVideos = true;
      } else {
        this.video = this.lec.vedios[0].url;
      }
    });
  }

  getLec(lId: string, cId: string): Observable<Lec> {
    return this.courseService.getLec(lId, cId).pipe(
      tap((data: any) => {
        this.description = data.lecture.description;
        this.cname = data.lecture.courseData.courseName;
      }),
      map((data: any) => data.lecture)
    );
 }

 onVideoSelected(event: any) {
  this.selectedVideoFile = event.target.files[0];
}

uploadVideo() {
  const formData = new FormData();
  formData.append('files', this.selectedVideoFile);
  this.addvid(formData,this.lectureId)
  // courseService.uploadVideo(formData,this.lectureId).subscribe(
  //   (res: any) => {
  //     console.log('Video uploaded successfully');
  //     this.showAddVideos = false;
  //     this.lec.vedios = res.vedios;
  //     this.video = res.vedios[0].url;
  //   },
  //   (err: any) => {
  //     console.error(err);
  //   }
  // );
}
addvid(formValue: any, id: string ) {
  this.courseService.uploadVideo(formValue,id).subscribe(() => {

  }, (error: any) => {
    console.error('Error in addCourse', error);
    // Set the error message
    this.errorMessage = error;
    console.log(this.errorMessage)
  });
  // this.router.navigate(['/Overviewcoursesprof',this.cId])
}

}

