import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addlecture',
  templateUrl: './addlecture.component.html',
  styleUrls: ['./addlecture.component.scss']
})

export class AddlectureComponent {
  cId:any
  token:any
  info:any
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getProfToken()
    this.info = jwtDecode(this.token)
    this.cId=this.route.snapshot.paramMap.get('id')!;
  }
  
  // constructor(private http: HttpClient) {}
 // if (!this.person.firstName || !this.person.lastName || !this.person.email || !this.person.password || !this.person.confirmPassword) {
    //   console.log('Please fill out all required fields');
    //   return;
    // }
    onSubmit(addlectureForm: NgForm) {
      const formData = {
        title: addlectureForm.value.name,
        description: addlectureForm.value.description,
        // datetime: addlectureForm.value.datetime,
      };
      if (addlectureForm.value.name ==='' || addlectureForm.value.description === '' ) {
        const correctSpan = document.getElementById('checked');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
          console.log(formData);
        }
      }else{
        this.addLec1(formData,this.cId, this.info.id)
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
  addLec1(formValue: any, cId: string,id: string ) {
    
        this.courseService.addLec1(formValue,cId ,id).subscribe(() => {
          this.router.navigate(['/Overviewcoursesprof',this.cId])
        });
      }
}
