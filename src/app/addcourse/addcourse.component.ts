import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent {
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(addcourseForm: NgForm) {
      const formData = {
        name: addcourseForm.value.name,
        description: addcourseForm.value.description,
        image: addcourseForm.value.image,
      };
      if (addcourseForm.value.name ==='' || addcourseForm.value.description === ''|| addcourseForm.value.image === '' ) {
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
    // this.router.navigate(['/courses']);
    // console.log(formData);
  }
}
