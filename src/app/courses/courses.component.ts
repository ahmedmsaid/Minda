import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses = [
    {
      //id
      name: 'Information Retrieval',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '10h' ,
      level: 'high'
    },
    {
      name: 'AI',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '1h' ,
      level: 'high'
    },
    {
      name: 'Robotics',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '5h' ,
      level: 'high'
    },
    {
      name: 'computer programming 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '3h' ,
      level: 'Average'
    },
    {
      name: 'computer programming xfgh gfyjn xyd cnhj ygtfj gthydf',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '3h' ,
      level: 'Average'
    },
  ];
}
