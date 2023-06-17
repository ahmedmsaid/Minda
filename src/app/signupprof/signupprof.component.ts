import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupprof',
  templateUrl: './signupprof.component.html',
  styleUrls: ['./signupprof.component.scss']
})
export class SignupprofComponent {
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(signupprofForm: NgForm) {
      const formData = {
        firstName: signupprofForm.value.firstName,
        lastName: signupprofForm.value.lastName,
        email: signupprofForm.value.email,
        profcode:signupprofForm.value.profcode,
        password: signupprofForm.value.password,
        confirmPassword: signupprofForm.value.confirmPassword,
        birthdate: signupprofForm.value.birthdate,
        phone: signupprofForm.value.phone,
        gender: signupprofForm.value.gender
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    this.router.navigate(['/loginprof']);
    console.log(formData);
  }
}
