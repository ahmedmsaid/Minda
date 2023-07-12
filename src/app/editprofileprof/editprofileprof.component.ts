import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editprofileprof',
  templateUrl: './editprofileprof.component.html',
  styleUrls: ['./editprofileprof.component.scss']
})
export class EditprofileprofComponent {
  profile:any
  token:any
  info:any
  id:any
  selectedimgFile:any
  img:any
  errorMessage: string = ''
  constructor(private router: Router, private route: ActivatedRoute, private userServiuce: UserService, private auth: AuthService) { 
  }
   ngOnInit(){
    this.token=this.auth.getToken()
    this.info=jwtDecode(this.token)
    this.id = this.info.id
    this.getProfile(this.id)
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
    this.userServiuce.userUpdateprof(formValue,id).subscribe(() => {
      this.router.navigate(['/profile'])
    }, (error: any) => {
      console.error('Error in addCourse', error);
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
      this.userServiuce.uploadimgprof(formValue,id).subscribe(() => {
      }, (error: any) => {
        console.error('Error in addCourse', error);
        // Set the error message
        this.errorMessage = error;
        console.log(this.errorMessage)
      });
      // this.router.navigate(['/Overviewcoursesprof',this.cId])
    } 
    deleteimg() {
      this.brushimg(this.info.id)
    }
    brushimg(id: string){
      this.userServiuce.deleteimgprof(id).subscribe(()=>{})
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
    onFileSelected(event:any) {
      this.selectedimgFile = event.target.files[0];
    }
    
}
