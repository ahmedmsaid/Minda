import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editlec',
  templateUrl: './editlec.component.html',
  styleUrls: ['./editlec.component.scss']
})
export class EditlecComponent {
  lec:any
  cId:any
  token:any
  info:any
  lecId:any
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService, private auth: AuthService) { 
    this.token = this.auth.getToken()
    this.info = jwtDecode(this.token)
    this.cId=this.route.snapshot.paramMap.get('id')!;
    this.lecId=this.route.snapshot.paramMap.get('Lid')!;
  }
  ngOnInit(){
    this.getLec1(this.lecId,this.cId)
  }
    onSubmit(updatelectureForm: NgForm) {
      const formData = {
        title: updatelectureForm.value.name,
        description: updatelectureForm.value.description,
      };
      if (updatelectureForm.value.name ==='' || updatelectureForm.value.description === '' ) {
        const correctSpan = document.getElementById('checked');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
          console.log(formData);
        }
      }else{
        this.editLec1(formData,this.lecId)
        console.log(formData);
      }
  }
  editLec1(formValue: any, id: string ) {
    this.courseService.editLec(formValue,id).subscribe();
    this.router.navigate(['/Overviewcoursesprof',this.cId])
  }
  getLec1(lId: string,cId: string ) {
    this.courseService.getLec(lId ,cId).subscribe((data:any) => {
      this.lec=data.lecture
  });}
}
