import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IProf } from '../prof.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signupprof',
  templateUrl: './signupprof.component.html',
  styleUrls: ['./signupprof.component.scss']
})
export class SignupprofComponent {
  prof!: IProf
  constructor(private router: Router, private auth: AuthService) { }
    onSubmit(signupprofForm: NgForm) {
      this.prof = {
        id: undefined,
        firstName: signupprofForm.value.firstName,
        lastName: signupprofForm.value.lastName,
        email: signupprofForm.value.email,
        password: signupprofForm.value.password,
        confirmPassword: signupprofForm.value.confirmPassword,
        code: signupprofForm.value.profcode,
      }

      if (signupprofForm.value.firstName ==='' || signupprofForm.value.lastName === ''|| signupprofForm.value.email === ''
      || signupprofForm.value.password === ''|| signupprofForm.value.confirmPassword === '' || signupprofForm.value.profcode === '') {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
          }
          
        }else{
            this.signup(this.prof);
          }
  }

  signup(prof: IProf) {
    this.auth.signUpProf(prof).subscribe(() => {
      this.router.navigate(['/loginprof'])
    });
  }
}
