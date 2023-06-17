import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent {
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(forgetpassForm: NgForm) {
      const formData = {
        email: forgetpassForm.value.email,
        password: forgetpassForm.value.password,
        confirmPassword: forgetpassForm.value.confirmPassword,
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    this.router.navigate(['/login']);
    console.log(formData);
  }
}
