import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';

@Component({
  selector: 'app-profile-doc',
  templateUrl: './profile-doc.component.html',
  styleUrls: ['./profile-doc.component.scss']
})
export class ProfileDocComponent {
  quiz:any
  percentage:any
  token:any
  info:any
  id:any
  courseId: any;
  quizId: any;
  constructor(private router: Router, private route: ActivatedRoute, private CourseService: CourseService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.quizId = this.route.snapshot.paramMap.get('Qid')!;
    this.getResultUser(this.courseId,this.quizId,this.id,this.token)
    console.log(this.getuserResult)
  }
  getResultUser(Cid: string,Qid: string,Uid: string,token:string){
    this.CourseService.getResult(Cid,Qid,Uid,token)
  .subscribe((data: any)=>{
      this.quiz = data
      this.getuserResult()
  })
  // console.log("dddd"+this.courses)
  }
  getuserResult(){
    this.percentage=Math.floor(Number(this.quiz.userMark) / this.quiz.quizMark * 100)
  }
}
