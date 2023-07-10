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
            this.signup(this.user);
          }
  }

  signup(user: IUser) {
    this.auth.signUpUser(user).subscribe(() => {
      this.router.navigate(['/login'])
    });
  }
}
