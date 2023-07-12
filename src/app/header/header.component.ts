import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  token=this.auth.getToken()
  info:any
  userToken:boolean=true
    constructor(private auth: AuthService, private userServiuce: UserService, private route: Router){
      // this.token=this.auth.getToken()
      
      // if(this.token){
      //   this.getProfile(this.info.id)
      // }
    }
    getProfile(id: string) {
      this.info=jwtDecode(this.token)
      this.userServiuce.getInfo(id).subscribe(
        (data:any) => {this.userToken = true;},
        (error: any) => {
          this.userToken = false;
        }
      );
    }
    logout(){
      this.auth.logout()
      this.route.navigate(['/login'])
    }
}
