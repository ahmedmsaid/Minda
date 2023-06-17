import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

// interface Question {
//   text: string;
//   choices: { text: string; correct: boolean }[]; 
// }

@Component({
  selector: 'app-quizprof',
  templateUrl: './quizprof.component.html',
  styleUrls: ['./quizprof.component.scss']
})
 export class QuizprofComponent  {
  course = 
    {
      title: 'Information Retrieval',
      authorName: "Dr. Asmaa",
    };

  correctChoice!: number;
  choice1Text: string = '';
  choice2Text: string = '';
  choice3Text: string = '';
  choice4Text: string = '';

  getSelectedChoiceText(): string {
    if (this.correctChoice === 1) {
      return this.choice1Text;
    } else if (this.correctChoice === 2) {
      return this.choice2Text;
    } else if (this.correctChoice === 3) {
      return this.choice3Text;
    } else if (this.correctChoice === 4) {
      return this.choice4Text;
    } else {
      return '';
    }
  }

  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(quizprofform: NgForm) {
      console.log(quizprofform.value.choiceCorrect);
      const formData = {
        questionText: quizprofform.value.questionText,
        choices: [
            {
              text: quizprofform.value.choice1Text,
              correct: quizprofform.value.choiceCorrect, 
            },
            {
              text: quizprofform.value.choice2Text,
              correct: quizprofform.value.choiceCorrect, 
            },
            {
              text: quizprofform.value.choice3Text,
              correct: quizprofform.value.choiceCorrect, 
            },
            {
              text: quizprofform.value.choice3Text,
              correct: quizprofform.value.choiceCorrect, 
            },
        ],
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    console.log(formData);
  }
 }
