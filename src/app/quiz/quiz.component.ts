import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  quiz: any;
  token: any;
  info: any;
  id: any;
  quizId: any;
  courseId: any;

  // The user's score
  score = 0;
  point = 0;

  // The user's selected options
  selected: number[] = new Array();

  // The user's answers
  answers: number[] = new Array();

  // A flag to indicate if the quiz is over
  finished = false;
  invalid: boolean = false
  errorMessage: string = ''

  constructor(private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService,
              private auth: AuthService) { }

  ngOnInit() {
    this.token = this.auth.getUserToken();
    this.info = jwtDecode(this.token);
    this.id = this.info.id;
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.quizId = this.route.snapshot.paramMap.get('Qid')!;
    this.getQuizData(this.quizId, this.courseId, this.token);
    console.log( this.quiz.questions.length+ 'out'+ this.answers)

    if (this.quiz && this.quiz.questions && this.quiz.questions.length > 0) {
      this.answers = new Array(this.quiz.questions.length).fill(-1);
      console.log( this.quiz.questions.length+ 'f'+ this.answers)
    }
    else{
      console.log( this.quiz.questions.length+ ''+ this.answers)
    }
  }

  getQuizData(qId: string, id: string, token: string) {
    this.courseService.getQuizUser(qId, id, token).subscribe((data: any) => {
      this.quiz = data.quiz;
    });
  }
  onSubmit(quizform: NgForm) {
    let allQuestionsAnswered = true;
    // for (let i = 0; i < this.selected.length; i++) {
    //   if (this.selected[i] === -1) {
    //     allQuestionsAnswered = false;
    //     break;
    //   }
    // }
    if (allQuestionsAnswered) {
      this.postQuizData(this.answers, this.courseId,this.quizId,this.token);
      console.log(this.answers);
    } else {
      const errorMessage = 'All Fields Are Required';
        const errorMessageElement = document.getElementById('Correct');
        if (errorMessageElement) {
          errorMessageElement.innerText = errorMessage;
        }
    }
  }
  postQuizData(formValue: any, id: string, qId: string, token: string) {
    let returnanswer = {
      answers: formValue
    }
    this.courseService.postQuizUser(returnanswer, id, qId, token).subscribe(() => {
      this.router.navigate([`courses/overviewcourses/${this.courseId}/quiz/${this.quizId}/result`])
    }, (error: any) => {
      this.errorMessage = error;
    });
  }
}

interface ApiResponse {
  status: string
  message: string
}