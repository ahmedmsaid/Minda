import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-profile-doc',
  templateUrl: './profile-doc.component.html',
  styleUrls: ['./profile-doc.component.scss']
})
export class ProfileDocComponent {
  profile:any
  token:any
  info:any
  id:any
  constructor(private router: Router, private route: ActivatedRoute, private userServiuce: UserService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getUserToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    // this.getCourse(id)
    this.getProfile(this.id,this.token)
  }
  getProfile(id: string,token:string){
    this.userServiuce.getInfo(id,token)
  .subscribe((data: any)=>{
      this.profile = data
  })
  // console.log("dddd"+this.courses)
  }
}
