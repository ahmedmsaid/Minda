import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router,private el: ElementRef) { }
  onSubmit(joinForm: NgForm) {
    this.router.navigate(['/Signup']);
  }

  start() {
    this.router.navigate(['/login']);
  }
  learn() : void {
    this.el.nativeElement.querySelector('#goal-section').scrollIntoView({ behavior: 'smooth' });
  }
}
