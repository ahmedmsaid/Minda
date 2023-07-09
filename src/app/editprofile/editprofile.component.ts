import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent {
  
  // info = [
  //   {
  //     image: '../../assets/img/add.jpg',
  //     fname:'OLa',
  //     lname:'Yasser',
  //     job:'student',
  //     school:'jdjdjjdjddd',
  //     country:'egypt',
  //     phone:'01063553343',
  //     password:'54666',
  //     bio:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  // ];
  // person = {
  //   firstName: '',
  //   lastName: '',
  //   job: '',
  //   password: '',
  //   country: '',
  //   bio: '',
  //   phone: '',
  // };
  profile:any
  token:any
  info:any
  id:any
  selectedimgFile:any
  img:any
  constructor(private router: Router, private route: ActivatedRoute, private userServiuce: UserService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.checkUserToken();
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.getProfile(this.id,this.token)
    // this.getCourse(id)
  }
    onSubmit(editprofileForm: NgForm) {
      const formData = {
        firstName: editprofileForm.value.fname,
        lastName: editprofileForm.value.lname,
        // email: editprofileForm.value.email,
        // password: editprofileForm.value.password,
        // job: editprofileForm.value.job,
        // country: editprofileForm.value.country,
        // phone: editprofileForm.value.phone,
      };
      if (editprofileForm.value.fname ==='' || editprofileForm.value.lname === ''// ||editprofileForm.value.email === ''
      //|| editprofileForm.value.password === ''|| editprofileForm.value.job === ''|| editprofileForm.value.country === ''
      /*|| editprofileForm.value.phone === '' */) {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
            console.log(formData);
          }
        }else{
          this.update(formData,this.info.id,this.token)
          this.router.navigate(['/profile']);
          console.log(formData);
        }
        
  }
  update(formValue: any, id: string,token:string ) {
    this.userServiuce.userUpdate(formValue,id ,token).subscribe(() => {});
    this.router.navigate(['/profile'])
  }
  uploadimg() {
      const formData = new FormData();
      formData.append('image', this.selectedimgFile);
      this.addimg(formData,this.info.id,this.token)
    }
  addimg(formValue: any, id: string ,token:string) {
      this.userServiuce.uploadimg(formValue,id,token).subscribe();
      // this.router.navigate(['/Overviewcoursesprof',this.cId])
    } 
    deleteimg() {
      this.brushimg(this.info.id,this.token)
    }
    brushimg(id: string,token: string){
      this.userServiuce.deleteimg(id,token).subscribe(()=>{})
    }
  getProfile(id: string,token:string){
    this.userServiuce.getInfo(id,token)
  .subscribe((data: any)=>{
      this.profile = data
  })}
  checkUserToken() {
    if (this.auth.getUserToken()) {
      this.token=this.auth.getUserToken()
    } else {
      this.token=this.auth.getProfToken()
    }}
    onFileSelected(event:any) {
      this.selectedimgFile = event.target.files[0];
    }
    
    
}
