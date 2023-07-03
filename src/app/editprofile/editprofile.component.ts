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
      fname:'OLa',
      lname:'Yasser',
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
    job: '',
    password: '',
    country: '',
    bio: '',
    phone: '',
  };
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(editprofileForm: NgForm) {
      const formData = {
        fname: editprofileForm.value.fname,
        lname: editprofileForm.value.lname,
        email: editprofileForm.value.email,
        password: editprofileForm.value.password,
        job: editprofileForm.value.job,
        country: editprofileForm.value.country,
        phone: editprofileForm.value.phone,
      };
      if (editprofileForm.value.fname ==='' || editprofileForm.value.lname === ''|| editprofileForm.value.email === ''
      || editprofileForm.value.password === ''|| editprofileForm.value.job === ''|| editprofileForm.value.country === ''
      || editprofileForm.value.phone === '' ) {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
            console.log(formData);
          }
        }else{
          this.router.navigate(['/profile']);
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
