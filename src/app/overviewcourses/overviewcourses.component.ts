import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {CoursesComponent} from '../courses/courses.component';
import { CourseService } from '../CourseService';
import { tap } from 'rxjs';
// interface Course {
//   id: number;
//   title: string;
//   Description: string;
//   authorName: string;
// }

interface Lesson {
  name: string;
  time: string;
}

interface Course {
  doctorData: {
    firstName: string,
    doctorId: string
  }
  _id: string
  courseName: string
  description: string
  lectureId: [{
    _id: string
    title: string
  }],
  quizzes: [{
    _id: string
    quizname: string
  }],
}

  

@Component({
  selector: 'app-overviewcourses',
  templateUrl: './overviewcourses.component.html',
  styleUrls: ['./overviewcourses.component.scss']
})

export class OverviewcoursesComponent implements OnInit {
  course!: Course
  // lecture!: lectureId[]

  CoursesComponent: any;
  
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')!;
    // this.getCourse(id)
    this.getInfo(id)
    console.log(id)
    console.log(this.course)

    // TODO: Use the id to retrieve the corresponding course data from your database or API
    // For now, we'll just hardcode some dummy data
    // this.course = {
    //   id: +id!,
    //   title: titlee,
    //   Description: 'About course, Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    //   authorName: 'Dr. Asmaa'
    // };
  }
  // Other methods for switching between course content, description, and discussion
    // getCourse(id: string){
    //   this.courseService.getCourseById(id)
    //   .pipe(tap( (data: any) => {
    //     this.course = data
    // }))
    // .subscribe()
    // }

    getInfo(id: string){
      this.courseService.getCourseInfo(id)
    .subscribe((data: any)=>{
        this.course = data
    })
    
    console.log("dddd"+this.course)
    }

    start(Cid: string,Lid: string) {
      this.router.navigate([`courses/overviewcourses/${Cid}/lec/${Lid}`]);
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
    onLecClick(Cid: string,Lid: string) {

      this.router.navigate([`courses/overviewcourses/${Cid}/lec/${Lid}`]);/////
    }
}

// import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { Router } from '@angular/router';

// interface Course {
//   title: string;
//   authorName: string;
//   Description: string;
// }

// interface Lesson {
//   name: string;
//   time: string;
// }

// @Component({
//   selector: 'app-overviewcourses',
//   templateUrl: './overviewcourses.component.html',
//   styleUrls: ['./overviewcourses.component.scss']
// })


// export class OverviewcoursesComponent {
//   constructor(private router: Router, private sanitizer: DomSanitizer) { }
//   course: Course = 
//     {
//       title: 'Information Retrieval',
//       authorName: "Dr. Asmaa",
//       Description:'About course, Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',

//     };
//     data : Lesson[]= [
//       { name: 'Course Overview', time: '5m' },
//       { name: 'lession1', time: '30m' },
//       { name: 'lession2', time: '35m' }
//     ];
//     start() {
//       this.router.navigate(['/lecture']);
//     }
//     quiz() {
//       this.router.navigate(['/quiz']);
//     }
//     @ViewChild('content') content!: ElementRef;

//     Content() {
//       // const newContent = `
//       //   <table class="my-table">
//       //     <tr *ngFor="let row of data">
//       //       <td>{{ row.name }}</td>
//       //       <td>{{ row.time }}</td>
//       //     </tr>
//       //   </table>
//       // `;
//       // if (this.content) {
//       //   const safeContent: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(newContent);
//       //   this.content.nativeElement.innerHTML = newContent;
//       // }
//     }
//     Description(){
//     //   const newContent = ` <p>{{ course.Description }}</p> `;
//     // if (this.content) {
//     //   this.content.nativeElement.innerHTML = newContent;
//     // }
//   }
    
//     Discussion(){}
// }
