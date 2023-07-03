import { Component } from '@angular/core';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  // An array of questions and answers
  questions = [
    {
      question: 'The process of removing most common words (and, or, the, etc.) by an information retrieval system before indexing is known as',
      options: ['Lemmatization', 'Stop word removal', 'Inverted indexing', 'Normalization'],
      answer: 1 // The index of the correct option
    },
    {
      question: 'The process of removing most common words (and, or, the, etc.) by an information retrieval system before indexing is known as',
      options: ['Lemmatization', 'Stop word removal', 'Inverted indexing', 'Normalization'],
      answer: 1 // The index of the correct option
    },
    {
      question: 'The process of removing most common words (and, or, the, etc.) by an information retrieval system before indexing is known as',
      options: ['Lemmatization', 'Stop word removal', 'Inverted indexing', 'Normalization'],
      answer: 1 // The index of the correct option
    },
  ];


  course = 
    {
      title: 'Information Retrieval',
      authorName: "Dr. Asmaa",
    };
  

  // The user's score
  score = 0;
  point = 0;

  // The user's selected options
  selected: number[] = new Array(this.questions.length).fill(-1);

  // A flag to indicate if the quiz is over
  finished = false;

  // A method to check the user's answers and update the score
  checkAnswers() {
    this.score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const selectedOption = this.selected[i];
      if (question.options[selectedOption] === question.options[question.answer]) {
        this.score++;
      }
    }
    this.point=Math.floor((this.score/this.questions.length)*100);
    this.finished = true;
  }
}