import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  person = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  constructor(private router: Router,private el: ElementRef) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(joinForm: NgForm) {
      const formData = {
        firstName: joinForm.value.firstName,
        lastName: joinForm.value.lastName,
        email: joinForm.value.email,
        phone: joinForm.value.phone,
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    this.router.navigate(['/Signup']);
    console.log(formData);
  }

  start() {
    this.router.navigate(['/Signup']);
  }
  learn() : void {
    this.el.nativeElement.querySelector('#goal-section').scrollIntoView({ behavior: 'smooth' });
  }
}
