import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';

@Component({
  selector: 'app-detaills',
  templateUrl: './detaills.component.html',
  styleUrls: ['./detaills.component.scss']
})
export class DetaillsComponent {
  deatills:any
  token:any
  info:any
  id:any
  courseId: any;
  quizId: any;
  quizMark:any
  constructor(private router: Router, private route: ActivatedRoute, private CourseService: CourseService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getProfToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.quizId = this.route.snapshot.paramMap.get('Qid')!;
    this.getInfo(this.courseId,this.quizId,this.token)
    console.log(this.getuserResult)
  }
  getInfo(Cid: string,Qid: string,token:string){
    this.CourseService.getDetail(Cid,Qid,token)
  .subscribe((data: any)=>{
      this.deatills = data
      this.quizMark =data.quizMark
      // this.getuserResult()
  })
  }
  getuserResult(mark:string){
    return Math.floor(Number(mark) / this.quizMark * 100)
  }
}
