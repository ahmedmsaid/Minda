import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private auth: AuthService, private route: Router){}

    logout(){
      this.auth.logout()
      this.route.navigate(['/login'])
    }
}
