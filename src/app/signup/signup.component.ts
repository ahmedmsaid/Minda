import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user!: IUser
  errorMessage: string = ''
  emailRegex = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  passwordRegex = new RegExp("^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d]{5,}$");

  constructor(private router: Router, private auth: AuthService) { }

    onSubmit(signupForm: NgForm) {
      this.user = {
        id: undefined,
        firstName: signupForm.value.firstName,
        lastName: signupForm.value.lastName,
        email: signupForm.value.email,
        password: signupForm.value.password,
        confirmPassword: signupForm.value.confirmPassword,
      };
      if (signupForm.value.firstName ==='' || signupForm.value.lastName === ''|| signupForm.value.email === ''
      || signupForm.value.password === ''|| signupForm.value.confirmPassword === '') {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
          }
      }else{
        const firstName = signupForm.value.firstName;
        const lastName = signupForm.value.lastName;
        const firstNameWords = firstName.split(" ");
        const lastNameWords = lastName.split(" ");
        if (firstNameWords.length >= 2 && lastNameWords.length >= 2) {
          if (this.emailRegex.test(signupForm.value.email)) {
            if (this.passwordRegex.test(signupForm.value.password)) {
              if(signupForm.value.confirmPassword == signupForm.value.password){
                this.signup(this.user);
              }else{
                const correctSpan = document.getElementById('checked');
                if (correctSpan !== null) {
                    correctSpan.innerText = 'Password Is Not Confirm';
                }
              }
            } else {
              const correctSpan = document.getElementById('checked');
              if (correctSpan !== null) {
                  correctSpan.innerText = 'Password Must Contain Numbers And Characters';
              }
            }
          } else {
            const correctSpan = document.getElementById('checked');
            if (correctSpan !== null) {
                correctSpan.innerText = 'Email IS Invalid';
            }
          }
        } else {
          const correctSpan = document.getElementById('checked');
            if (correctSpan !== null) {
                correctSpan.innerText = 'First and/or last name do not have at least two words';
            }
          }
        }
      }

  signup(user: IUser) {
    this.auth.signUpUser(user).subscribe(() => {
      this.router.navigate(['/login'])
    }, (error: any) => {
      const correctSpan = document.getElementById('checked');
      if (correctSpan !== null) {
          correctSpan.innerText = error;
      }
    }
    );
  }
}