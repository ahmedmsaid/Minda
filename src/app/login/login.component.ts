import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Input() form: FormGroup;
    loginInvalid = false
    public token: any;
    // isAdmin:boolean=false
    constructor(private fb:FormBuilder, private authService: AuthService, private router: Router) {
          this.form = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });
    }
    
    sign(){
      this.router.navigate(['/Signup']);
    }

    forgetpass(){
      this.router.navigate(['/forgetpass']);
    }

    onSubmit(loginForm: NgForm) {

        let email = loginForm.value.email
        let password = loginForm.value.password

        this.login(email, password)                 
  }


  login(email: string, password: string) {
        this.authService.loginUser(email, password)
        .subscribe( res => {
          if(!res) {
              this.loginInvalid = true
          } else {
            this.token = jwtDecode(res)
            console.log("User is logged in");
            console.log(this.token.id)
            if(this.token.isAdmin){
              this.router.navigate(['/AdminController']);
            }else{
              this.router.navigate(['/courses']);
            }
          }
      })
    }
}
