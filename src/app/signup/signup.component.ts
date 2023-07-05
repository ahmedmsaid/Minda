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
        date: signupForm.value.birthdate,
        phone: signupForm.value.phone
      };

      this.auth.signUpUser(this.user).subscribe(() => {
        this.router.navigate(['/login'])
    });

      console.log(this.user)
    
  }
}
