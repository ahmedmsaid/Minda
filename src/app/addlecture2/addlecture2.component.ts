import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlecture2',
  templateUrl: './addlecture2.component.html',
  styleUrls: ['./addlecture2.component.scss']
})
export class Addlecture2Component {
  constructor(private router: Router) { }
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(addlecture2Form: NgForm) {
      const formData = {
        video: addlecture2Form.value.video,
        file: addlecture2Form.value.file,
        image: addlecture2Form.value.image,
      };

    // this.http.post('your-api-url', formData).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    this.router.navigate(['/courses']);
    console.log(formData);
  }
}
