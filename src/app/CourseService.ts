import { Injectable } from '@angular/core';

interface Lesson {
    id: number;
    title: string;
    description: string;
    duration: string;
  }
interface Course {
  id: number;
  name: string;
  description: string;
  authorName: string;
  lessons: Lesson[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses: Course[] = [
    {
      id: 1,
      name: 'Information Retrieval',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      authorName: 'John Doe',
      lessons: [
        {
          id: 1,
          title: 'Lesson 1',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        },
        {
          id: 2,
          title: 'Lesson 2',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        }
      ]
    },
    {
      id: 2,
      name: 'AI',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      authorName: 'Jane Doe',
      lessons: [
        {
          id: 1,
          title: 'Lesson 1',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        },
        {
          id: 2,
          title: 'Lesson 2',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        }
      ]
    },
    {
      id: 3,
      name: 'Robotics',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      authorName: 'John Smith',
      lessons: [
        {
          id: 1,
          title: 'Lesson 1',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        },
        {
          id: 2,
          title: 'Lesson 2',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        }
      ]
    },
    {
      id: 4,
      name: 'Computer Programming 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      authorName: 'Jane Smith',
      lessons: [
        {
          id: 1,
          title: 'Lesson 1',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        },
        {
          id: 2,
          title: 'Lesson 2',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          duration: '1h'
        }
      ]
    }
  ];

  constructor() { }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }
}