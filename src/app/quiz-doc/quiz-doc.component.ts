import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-quiz-doc',
  templateUrl: './quiz-doc.component.html',
  styleUrls: ['./quiz-doc.component.scss']
})
export class QuizDocComponent {
  Quiz:any
  token:any
  info:any
  id:any
  quizId: any
  courseId: any
  correct: any
  i:number | undefined
  constructor(private router: Router, private route: ActivatedRoute,private courseService:CourseService, private userServiuce: UserService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.quizId = this.route.snapshot.paramMap.get('Qid')!;
    this.getQuizData(this.quizId,this.courseId,this.token)
      
  }
  getQuizData(qId: string,id: string,token: string){
    this.courseService.getQuiz(qId,id,token)
  .subscribe((data: any)=>{
      this.Quiz = data.quiz
  })
  }
}
