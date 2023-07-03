import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Course {
  id: number;
  name: string;
  description: string;
  time: string;
  level: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  public courses: Course[] = [
    {
      id: 1,
      name: 'Information Retrieval',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '10h' ,
      level: 'high'
    },
    {
      id: 2,
      name: 'AI',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '1h' ,
      level: 'high'
    },
    {
      id: 3,
      name: 'Robotics',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '5h' ,
      level: 'high'
    },
    {
      id: 4,
      name: 'computer programming 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '3h' ,
      level: 'Average'
    },
  ];

  constructor(private router: Router) { }

  onCourseClick(id: number) {
    this.router.navigate(['/overviewcourses', id]);
  }
  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }
}
interface Course {
  id: number;
  name: string;
  description: string;
  time: string;
  level: string;
}