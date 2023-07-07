import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

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
  constructor(private router: Router, private route: ActivatedRoute, private userServiuce: UserService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.checkUserToken();
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.getProfile(this.id,this.token)
  }
  getProfile(id: string,token:string){
    this.userServiuce.getInfo(id,token)
  .subscribe((data: any)=>{
      this.profile = data
  })
  // console.log("dddd"+this.courses)
  }
  checkUserToken() {
    if (this.auth.getUserToken()) {
      this.token=this.auth.getUserToken()
    } else {
      this.token=this.auth.getProfToken()
    }}
}
