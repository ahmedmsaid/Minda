import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loginprof',
  templateUrl: './loginprof.component.html',
  styleUrls: ['./loginprof.component.scss']
})
export class LoginprofComponent {
  loginInvalid = false

  constructor(private router: Router, private auth: AuthService) { }
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
        let email = loginprofForm.value.email
        let password = loginprofForm.value.password

        this.login(email, password)

      if (loginprofForm.value.email ==='' ||loginprofForm.value.password === '' ) {
        const correctSpan = document.getElementById('checked');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
        }
      }
  }

  login(email: string, password: string) {
    this.auth.loginProf(email, password)
    .subscribe( res => {
      if(!res) {
          this.loginInvalid = true
      } else {
        console.log("User is logged in");
        this.router.navigate(['/profcourses']);
      }
  })
}
}
