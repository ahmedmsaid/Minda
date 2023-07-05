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
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(signupprofForm: NgForm) {
      this.prof = {
        id: undefined,
        firstName: signupprofForm.value.firstName,
        lastName: signupprofForm.value.lastName,
        email: signupprofForm.value.email,
        password: signupprofForm.value.password,
        confirmPassword: signupprofForm.value.confirmPassword,
        date: signupprofForm.value.birthdate,
        phone: signupprofForm.value.phone,
        code: signupprofForm.value.profcode,
      }

      this.signup(this.prof);

      if (signupprofForm.value.firstName ==='' || signupprofForm.value.lastName === ''|| signupprofForm.value.email === ''
      || signupprofForm.value.password === ''|| signupprofForm.value.confirmPassword === ''|| signupprofForm.value.birthdate === ''
      || signupprofForm.value.phone === ''|| signupprofForm.value.gender === '' ) {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
          }
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

  signup(prof: IProf) {
    this.auth.signUpProf(prof).subscribe(() => {
      this.router.navigate(['/loginprof'])
    });
  }
}
