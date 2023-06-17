import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface Course {
  title: string;
  authorName: string;
  Description: string;
}

interface Lesson {
  name: string;
  time: string;
}

@Component({
  selector: 'app-overviewcourses',
  templateUrl: './overviewcourses.component.html',
  styleUrls: ['./overviewcourses.component.scss']
})


export class OverviewcoursesComponent {
  constructor(private router: Router, private sanitizer: DomSanitizer) { }
  course: Course = 
    {
      title: 'Information Retrieval',
      authorName: "Dr. Asmaa",
      Description:'About course, Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',

    };
    data : Lesson[]= [
      { name: 'Course Overview', time: '5m' },
      { name: 'lession1', time: '30m' },
      { name: 'lession2', time: '35m' }
    ];
    start() {
      this.router.navigate(['/lecture']);
    }
    quiz() {
      this.router.navigate(['/quiz']);
    }
    @ViewChild('content') content!: ElementRef;

    Content() {
      // const newContent = `
      //   <table class="my-table">
      //     <tr *ngFor="let row of data">
      //       <td>{{ row.name }}</td>
      //       <td>{{ row.time }}</td>
      //     </tr>
      //   </table>
      // `;
      // if (this.content) {
      //   const safeContent: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(newContent);
      //   this.content.nativeElement.innerHTML = newContent;
      // }
    }
    Description(){
    //   const newContent = ` <p>{{ course.Description }}</p> `;
    // if (this.content) {
    //   this.content.nativeElement.innerHTML = newContent;
    // }
  }
    
    Discussion(){}
}
