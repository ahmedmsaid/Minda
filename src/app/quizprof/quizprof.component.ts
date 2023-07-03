import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-quizprof',
  templateUrl: './quizprof.component.html',
  styleUrls: ['./quizprof.component.scss']
})
 export class QuizprofComponent  {
  course = 
    {
      title: 'Information Retrieval',
    };
    quiz = {
      q: '',
      choices: [{
        a1: '',
        a2: '',
        a3: '',
        a4: '',
      }],
      Correct:''
    };  
    onSubmit(quizprofform: NgForm) {
      const formData = {
        q: quizprofform.value.q,
        a1: quizprofform.value.a1,
        a2: quizprofform.value.a2,
        a3: quizprofform.value.a3,
        a4: quizprofform.value.a4,
        Correct: quizprofform.value.Correct,
      };

      if (quizprofform.value.Correct !== quizprofform.value.a1 && quizprofform.value.Correct !== quizprofform.value.a2 &&
        quizprofform.value.Correct !== quizprofform.value.a3 && quizprofform.value.Correct !== quizprofform.value.a4) {
          const correctSpan = document.getElementById('Correct');
          if (correctSpan !== null) {
            correctSpan.innerText = 'Correct answer should be in the previous 4 fildes';
            console.log(formData);
          }
        }else{
          console.log(formData);
        }

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    
  }
 }
