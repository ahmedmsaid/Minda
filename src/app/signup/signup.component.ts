import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  person = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phone: '',
    gender: ''
  };
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(signupForm: NgForm) {
      const formData = {
        firstName: signupForm.value.firstName,
        lastName: signupForm.value.lastName,
        email: signupForm.value.email,
        password: signupForm.value.password,
        confirmPassword: signupForm.value.confirmPassword,
        birthdate: signupForm.value.birthdate,
        phone: signupForm.value.phone,
        gender: signupForm.value.gender
      };
      if (signupForm.value.firstName ==='' || signupForm.value.lastName === ''|| signupForm.value.email === ''
      || signupForm.value.password === ''|| signupForm.value.confirmPassword === ''|| signupForm.value.birthdate === ''
      || signupForm.value.phone === ''|| signupForm.value.gender === '' ) {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
            console.log(formData);
          }
        }else{
          this.router.navigate(['/login']);
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
