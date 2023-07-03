import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-overviewcoursesprof',
  templateUrl: './overviewcoursesprof.component.html',
  styleUrls: ['./overviewcoursesprof.component.scss']
})
export class OverviewcoursesprofComponent implements OnInit {
  course: {
    id: number;
    name: string;
    description: string;
    authorName: string;
    lessons: Lesson[];
  } = {
    id: 0,
    name: '',
    description: '',
    authorName: '',
    lessons: []
  };
  data: Lesson[] = [
    { name: 'Course Overview', time: '5m' },
    { name: 'Lession 1', time: '30m' },
    { name: 'Lession 2', time: '35m' }
  ];
  CoursesComponent: any;
  constructor(private router: Router, private sanitizer: DomSanitizer,private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const course = this.CoursesComponent.getCourseById(id);
    if (course) {
      this.course = course;
    }
    // TODO: Use the id to retrieve the corresponding course data from your database or API
    // For now, we'll just hardcode some dummy data
    // this.course = {
    //   id: +id!,
    //   title: titlee,
    //   Description: 'About course, Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    //   authorName: 'Dr. Asmaa'
    // };
  }
    start() {
      this.router.navigate(['/lecture']);
    }
    quiz() {
      this.router.navigate(['/quizprof']);
    }
    Lesson() {
      this.router.navigate(['/addlecture']);
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
