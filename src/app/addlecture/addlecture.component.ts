import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlecture',
  templateUrl: './addlecture.component.html',
  styleUrls: ['./addlecture.component.scss']
})
export class AddlectureComponent {
  constructor(private router: Router) { }
  
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(addlectureForm: NgForm) {
      const formData = {
        name: addlectureForm.value.name,
        description: addlectureForm.value.description,
        datetime: addlectureForm.value.datetime,
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    this.router.navigate(['/addlecture2']);
    console.log(formData);
  }
}
