import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

interface Answer {
  text: string;
  isCorrect: boolean;
  // _id: string;
}

interface Question {
  title: string;
  choose: Answer[];
  mark: Number;
  // _id: string;
}

interface Quiz {
  quizname: string;
  questions: Question[];
}
@Component({
  selector: 'app-quizprof',
  templateUrl: './quizprof.component.html',
  styleUrls: ['./quizprof.component.scss']
})
 export class QuizprofComponent  {
  cId:any
  token:any
  info:any
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getToken()
    this.info = jwtDecode(this.token)
    this.cId=this.route.snapshot.paramMap.get('id')!;
    console.log("cid"+this.cId)
  }
  course = {
    title: 'Information Retrieval',
  };
  quiz: Quiz = {
    quizname: '',
    questions: [
      {
        title: '',
        choose: [
          {
            text: '',
            isCorrect: false,
            // _id: '',
          },
          {
            text: '',
            isCorrect: false,
            // _id: '',
          },
        ],
        mark: 1,
        // _id: '',
      },
    ],
  };
  selectedAnswer: number[] = [];

  addQuestion() {
    this.quiz.questions.push({
      title: '',
      choose: [
        {
          text: '',
          isCorrect: false,
          // _id: '',
        },
        {
          text: '',
          isCorrect: false,
          // _id: '',
        },
      ],
      mark: 1,
      // _id: '',
    });
    this.isAddAnswerVisible.push(false);////
  }
  isAddAnswerVisible: boolean[] = [];
  addAnswer(questionIndex: number) {
    if(this.quiz.questions[questionIndex].choose.length<4){
      this.quiz.questions[questionIndex].choose.push({
        text: '',
        isCorrect: false,
        // _id: '',
      });
    }else{
      this.isAddAnswerVisible[questionIndex] = !this.isAddAnswerVisible[questionIndex];
    }
  }
  getAnswers(): Answer[][] {
    return this.quiz.questions.map((question, i) => {
      const correctAnswerIndex = this.selectedAnswer[i];
      const answers = question.choose.map((answer, j) => {
        return {
          text: answer.text,
          isCorrect: j === correctAnswerIndex,
          // _id: answer._id,
        };
      });
      return answers;
    });
  }

  onSubmit(quizprofform: NgForm) {
    let isFormValid = true;
    for (let i = 0; i < this.quiz.questions.length; i++) {
      const question = this.quiz.questions[i];
      const selectedAnswerIndex = this.selectedAnswer[i];
      if (selectedAnswerIndex === undefined) {
        isFormValid = false;
        break;
      }
      const correctAnswer = question.choose[selectedAnswerIndex];
      for (let j = 0; j < question.choose.length; j++) {
        const answer = question.choose[j];
        answer.isCorrect = answer === correctAnswer;
        if (answer.text.trim() === '') {
          isFormValid = false;
          break;
        }
      }
      if (!question.title || question.title.trim() === '') {
        isFormValid = false;
        break;
      }
      if (!quizprofform.value.quizname || quizprofform.value.quizname.trim() === '') {
        isFormValid = false;
        break;
      }
    }
  
    if (isFormValid) {
      this.makeQuiz(this.quiz, this.cId);
      console.log(this.quiz);
    } else {
      const errorMessage = 'All Fields Are Required';
      const errorMessageElement = document.getElementById('Correct');
      if (errorMessageElement) {
        errorMessageElement.innerText = errorMessage;
      }
    }
  }
  makeQuiz(formValue: any, cId: string) {
    this.courseService.addQuiz(formValue,cId).subscribe(() => {
    this.router.navigate(['/Overviewcoursesprof',this.cId])
  });}
 }
