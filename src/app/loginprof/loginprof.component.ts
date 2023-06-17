import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginprof',
  templateUrl: './loginprof.component.html',
  styleUrls: ['./loginprof.component.scss']
})
export class LoginprofComponent {
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(loginprofForm: NgForm) {
      const formData = {
        email: loginprofForm.value.email,
        password: loginprofForm.value.password,
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    this.router.navigate(['/profcourses']);
    console.log(formData);
  }
}
