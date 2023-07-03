import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    sign(){
      this.router.navigate(['/Signup']);
    }
    forgetpass(){
      this.router.navigate(['/forgetpass']);
    }
    onSubmit(loginForm: NgForm) {
      const formData = {
        email: loginForm.value.email,
        password: loginForm.value.password,
      };
      if (loginForm.value.email ==='' || loginForm.value.password === '' ) {
        const correctSpan = document.getElementById('checked');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
          console.log(formData);
        }
      }else{
        this.router.navigate(['/courses']);
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
