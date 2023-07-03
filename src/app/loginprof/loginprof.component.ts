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
    sign(){
      this.router.navigate(['/Signupprof']);
    }
    forgetpass(){
      this.router.navigate(['/forgetpass']);
    }
    onSubmit(loginprofForm: NgForm) {
      const formData = {
        email: loginprofForm.value.email,
        password: loginprofForm.value.password,
      };
      if (loginprofForm.value.email ==='' ||loginprofForm.value.password === '' ) {
        const correctSpan = document.getElementById('checked');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
          console.log(formData);
        }
      }else{
        this.router.navigate(['/profcourses']);
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
