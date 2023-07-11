import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';

@Component({
  selector: 'app-assigndetails',
  templateUrl: './assigndetails.component.html',
  styleUrls: ['./assigndetails.component.scss']
})
export class AssigndetailsComponent {
  deatills:any
  token:any
  info:any
  id:any
  courseId: any;
  aId: any;
  quizMark:any
  constructor(private router: Router, private route: ActivatedRoute, private CourseService: CourseService, private auth: AuthService) { 
  }
  ngOnInit(){
    this.token=this.auth.getToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.aId = this.route.snapshot.paramMap.get('aid')!;
    this.getInfo(this.courseId,this.aId)
  }
  getInfo(Cid: string,aid: string){
    this.CourseService.getAssignmentdetails(Cid,aid)
    .subscribe((data: any)=>{
      this.deatills = data.assignmentResponses})
  }
}
