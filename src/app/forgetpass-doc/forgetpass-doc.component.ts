import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgetpass-doc',
  templateUrl: './forgetpass-doc.component.html',
  styleUrls: ['./forgetpass-doc.component.scss']
})
export class ForgetpassDocComponent {
  showElement: boolean = false;
  Element: boolean = false;
  uid:any
  info:any
  gettoken:any
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
    this.userServiuce.forgetProf(formValue).subscribe();
    this.showElement = !this.showElement;
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
        this.token(tokenData)
        this.gettoken=tokenData.token
      }
  }
  token(formValue: any) {
    this.userServiuce.tokenProf(formValue).subscribe();
    this.Element = !this.Element;
    this.showElement = !this.showElement;
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
    this.userServiuce.resetProf(formValue).subscribe();
    this.router.navigate(['/loginprof']);

  }
}