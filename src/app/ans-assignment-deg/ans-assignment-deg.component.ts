import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { CourseService } from '../CourseService';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-ans-assignment-deg',
  templateUrl: './ans-assignment-deg.component.html',
  styleUrls: ['./ans-assignment-deg.component.scss']
})
export class AnsAssignmentDegComponent {
  deatills:any
  token:any
  info:any
  id:any
  aId: any;
  cId: any;
  quizMark:any
  score:any
  constructor(private router: Router, private route: ActivatedRoute, private CourseService: CourseService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getProfToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.aId = this.route.snapshot.paramMap.get('aid')!;
    this.cId = this.route.snapshot.paramMap.get('id')!;
    this.getInfo(this.cId,this.aId)
    this.getScore(this.cId,this.aId)
    console.log(this.deatills)
  }
  getInfo(cid:string,aid: string){
    this.CourseService.getuserAnswerAssignment(cid,aid)
  .subscribe((data: any)=>{
      this.deatills = data
    console.log(this.deatills)

  })}
  getScore(Cid: string,aid: string){
    this.CourseService.getAssignmentdetails(Cid,aid)
  .subscribe((data: any)=>{
      this.score = data.assignmentResponses
  })
  }
  onSubmit(assignmentform: NgForm,uId:string) {
    const formdata= {
      userId:uId,
      score:Number(assignmentform.value.degree),
    }
    if (assignmentform.value.degree ==='' ) {
        const correctSpan = document.getElementById('Correct');
        if (correctSpan !== null) {
          correctSpan.innerText = 'All Fileds Are Required';
          console.log(formdata);
        }
      }else{
        this.putInfo(formdata,this.cId,this.aId )

        console.log(formdata);
      }
  }
  putInfo(formdata:any,cid:string,aid: string){
    this.CourseService.postdegAssignment(formdata,cid,aid).subscribe(()=>{})}
}
