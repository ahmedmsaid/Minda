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

  // info = [
  //   {
  //     image: '../../assets/img/add.jpg',
  //     name:'OLa Yasser',
  //     jop:'student',
  //     school:'jdjdjjdjddd',
  //     country:'egypt',
  //     phone:'0106553343',
  //     bio:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //     courseenrolled: [
  //       {
  //       name: 'Information Retrieval',
  //       description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //       time: '10h' ,
  //       level: 'high'
  //       },
  //     ],
  //     coursecompleted: [
  //       {
  //         name: 'AI',
  //         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //         time: '1h' ,
  //         level: 'high'
  //       },
  //     ],
  //     badgets: [
  //       {
  //         image: '',
  //         title: ' ',
  //       },
  //     ],
  //   },
  // ];
}
