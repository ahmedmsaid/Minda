import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

interface Answer {
  text: string;
  isCorrect: boolean;
  _id: string;
}

interface Question {
  title: string;
  choose: Answer[];
  mark: Number;
  _id: string;
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
            _id: '',
          },
          {
            text: '',
            isCorrect: false,
            _id: '',
          },
        ],
        mark: 1,
        _id: '',
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
          _id: '',
        },
        {
          text: '',
          isCorrect: false,
          _id: '',
        },
      ],
      mark: 1,
      _id: '',
    });
    this.isAddAnswerVisible.push(false);////
  }
  isAddAnswerVisible: boolean[] = [];
  addAnswer(questionIndex: number) {
    if(this.quiz.questions[questionIndex].choose.length<4){
      this.quiz.questions[questionIndex].choose.push({
        text: '',
        isCorrect: false,
        _id: '',
      });
    }else{
      this.isAddAnswerVisible[questionIndex] = !this.isAddAnswerVisible[questionIndex];
    }
  }
  getAnswers(): Answer[][] {
    return this.quiz.questions.map((question, i) => {
      const answers = question.choose.map((answer, j) => {
        return {
          text: answer.text,
          isCorrect: j === this.selectedAnswer[i],
          _id: answer._id,
        };
      });
      return answers;
    });
  }

  onSubmit(quizprofform: NgForm) {
    const answers = this.getAnswers();
    let isFormValid = true;
    for (let i = 0; i < answers.length; i++) {
      if (this.selectedAnswer[i] === undefined) {
        isFormValid = false;
        break;
      }
      const markIndex = i;
      const questionTitle = quizprofform.value['q' + markIndex];
      const mark = quizprofform.value['mark' + markIndex];
      if (!questionTitle || questionTitle.trim() === '') {
        isFormValid = false;
        break;
      }
      if (!quizprofform.value.quizname || quizprofform.value.quizname.trim() === '') {
        isFormValid = false;
        break;
      }
      for (let j = 0; j < answers[i].length; j++) {
        if (answers[i][j].text.trim() === '') {
          isFormValid = false;
          break;
        }
      }
    }
    if (isFormValid) {
      console.log(this.quiz);
    } else {
      const errorMessage = 'All Fields Are Required';
      const errorMessageElement = document.getElementById('Correct');
      if (errorMessageElement) {
        errorMessageElement.innerText = errorMessage;
      }
    }
  }
 }
