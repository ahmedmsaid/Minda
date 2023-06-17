import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent {
  info = [
    {
      image: '../../assets/img/add.jpg',
      name:'OLa Yasser',
      job:'student',
      school:'jdjdjjdjddd',
      country:'egypt',
      phone:'01063553343',
      password:'54666',
      bio:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];
  person = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phone: '',
    gender: ''
  };
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(signupForm: NgForm) {
      const formData = {
        firstName: signupForm.value.firstName,
        lastName: signupForm.value.lastName,
        email: signupForm.value.email,
        password: signupForm.value.password,
        confirmPassword: signupForm.value.confirmPassword,
        birthdate: signupForm.value.birthdate,
        phone: signupForm.value.phone,
        gender: signupForm.value.gender
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    this.router.navigate(['/profile']);
    console.log(formData);
  }
}
