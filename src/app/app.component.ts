import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minda';
  token: any
  constructor(private auth: AuthService){
    this.auth.token = this.token
  }

  ngOnInit() {
    this.checkUserToken()
  }

  checkUserToken() {
    if (this.auth.getUserToken()) {
      this.token=this.auth.getUserToken()
    } else {
      this.token=this.auth.getProfToken()
    }}
}
