import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { ICourse } from '../course.model';
import { tap } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile:any
  token:any
  info:any
  id:any
  errorMessage:any
  constructor(private router: Router, private route: ActivatedRoute, private userServiuce: UserService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.getProfile(this.id)
  }
  onCourseClick(id: string) {
    this.router.navigate(['/overviewcourses', id]);
    console.log(id)
  }
  getProfile(id: string) {
    this.userServiuce.getInfo(id).subscribe(
      (data: any) => {
        this.profile = data;
      },
      (error: any) => {
        this.getProfileFromInfoProf(id);
        AppComponent.user=false
      }
    );
  }
  getProfileFromInfoProf(id: string) {
    this.userServiuce.getInfoProf(id).subscribe(
      (data: any) => {
        this.profile = data;
      },
      (error: any) => {
        console.error('Error getting profile information:', error);
      }
    );
  }
  edit(){
    if(AppComponent.user){
      this.router.navigate(['/editprofile'])
    }else{
      this.router.navigate(['/editprofileprof'])
    }
  }
}
