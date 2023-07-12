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
  profile:any
  token:any
  info:any
  id:any
  selectedimgFile:any
  img:any
  errorMessage: string = ''
  upload:boolean=false
  deleteelement:boolean=true
  constructor(private router: Router, private route: ActivatedRoute, private userServiuce: UserService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.getProfile(this.info.id)
  }
    onSubmit(editprofileForm: NgForm) {
      const formData = {
        firstName: editprofileForm.value.fname,
        lastName: editprofileForm.value.lname,
      };
      if (editprofileForm.value.fname ==='' || editprofileForm.value.lname === '') {
          const correctSpan = document.getElementById('checked');
          if (correctSpan !== null) {
            correctSpan.innerText = 'All Fileds Are Required';
            console.log(formData);
          }
        }else{
          this.update(formData,this.info.id)
          this.router.navigate(['/profile']);
          console.log(formData);
        }
        
  }
  update(formValue: any, id: string ) {
    this.userServiuce.userUpdate(formValue,id).subscribe(() => {
      this.router.navigate(['/profile'])
    }, (error: any) => {
      console.error('Error in addCourse', error);
      // Set the error message
      this.errorMessage = error;
      console.log(this.errorMessage)
    }
    )
  }
  uploadimg() {
      const formData = new FormData();
      formData.append('image', this.selectedimgFile);
      this.addimg(formData,this.info.id)
    }
  addimg(formValue: any, id: string ) {
      this.userServiuce.uploadimg(formValue,id).subscribe(() => {
      }, (error: any) => {
        console.error('Error in addCourse', error);
        // Set the error message
        this.errorMessage = error;
        console.log(this.errorMessage)
      });
    } 
    deleteimg() {
      this.brushimg(this.info.id)
      this.upload=true
      this.deleteelement=false
    }
    brushimg(id: string){
      this.userServiuce.deleteimg(id).subscribe(()=>{})
    }
    onFileSelected(event:any) {
      this.selectedimgFile = event.target.files[0];
    }
    getProfile(id: string) {
      this.userServiuce.getInfo(id).subscribe(
        (data: any) => {
          this.profile = data;
        },
        (error: any) => {
          this.getProfileFromInfoProf(id);
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
    
}
