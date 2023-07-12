import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent {
  showElement: boolean = false;
  Element: boolean = false;
  uid:any
  info:any
  gettoken:any
  errorMessage:any
  constructor(private router: Router, private userServiuce: UserService) { }
  onSubmit(forgetpassForm: NgForm) {
    const formData = {
      email: forgetpassForm.value.email,
    };
    if (forgetpassForm.value.email ==='' ) {
      const correctSpan = document.getElementById('checked');
      if (correctSpan !== null) {
        correctSpan.innerText = 'All Fileds Are Required';
      }
    }else{
        this.forget(formData)
      }
  }
  forget(formValue: any) {
    this.userServiuce.forgetUser(formValue).subscribe(() => {this.showElement = !this.showElement;
    }, (error: any) => {
      console.error('Error in addCourse', error);
      // Set the error message
      this.errorMessage = error;
      console.log(this.errorMessage)
    });
  }
  ontokenSubmit(tokenForm: NgForm) {
    const tokenData = {
      token: tokenForm.value.token,
    };
    if (tokenForm.value.token ==='' ) {
      const correctSpan = document.getElementById('checked');
      if (correctSpan !== null) {
        correctSpan.innerText = 'All Fileds Are Required';
      }
    }else{
        this.showElement=false
        this.token(tokenData)
        this.gettoken=tokenData.token
      }
  }
  token(formValue: any) {
    this.userServiuce.tokenUser(formValue).subscribe(() => {this.Element = !this.Element;
    }, (error: any) => {
      console.error('Error in addCourse', error);
      // Set the error message
      this.errorMessage = error;
      console.log(this.errorMessage)
    });
  }
  onresetSubmit(resetpassForm: NgForm) {
    const Data = {
      token: this.gettoken,
      password: resetpassForm.value.password,
    };
    if ( resetpassForm.value.password === '' ) {
      const correctSpan = document.getElementById('checked');
      if (correctSpan !== null) {
        correctSpan.innerText = 'All Fileds Are Required';
      }
    }else{
        this.reset(Data)
      }
  }
  reset(formValue: any) {
    this.userServiuce.resetUser(formValue).subscribe(() => {this.router.navigate(['/login']);
    }, (error: any) => {
      console.error('Error in addCourse', error);
      // Set the error message
      this.errorMessage = error;
      console.log(this.errorMessage)
    });
  }
}
