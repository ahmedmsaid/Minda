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
  

  // The current question index
  index = 0;

  // The user's score
  score = 0;

  // The user's selected option
  selected = -1;

  // A flag to indicate if the quiz is over
  finished = false;
  btn='Next';

  // A method to check the user's answer and update the score
  checkAnswer() {
    if (this.selected === this.questions[this.index].answer) {
      this.score++;
    }
    this.nextQuestion();
  }

  // A method to move to the next question or end the quiz
  nextQuestion() {
    this.selected = -1;
    if (this.index < this.questions.length - 1) {
      this.index++;
    } else {
      this.finished = true;
    }
    // if (this.index = this.questions.length - 1) {
    //   this.btn='Submit';
    // }else {
    //   this.finished = false;
    // }
  }

}
