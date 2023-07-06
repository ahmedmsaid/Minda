import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { ICourse } from './course.model';

interface Lesson {
    id: number;
    title: string;
    description: string;
    duration: string;
}

interface Course {
  id: string | number;
  name?: string;
  description?: string;
  authorName?: string;
  rating? : number
  lessons?: Lesson[];
}

@Injectable()

export class CourseService {
  private api = "https://e-learning1.onrender.com/api/";
  userToken: any
  profToken: any
  info: any

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userToken = this.auth.getUserToken()
    this.profToken = this.auth.getProfToken()
   }

  getCourses(userId: any, token: string): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}

    return this.http.get<any[]>(this.api + 'user/enrolledCourses/' + userId, options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }

  getManagedCourses(userId: any, token: string): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}

    return this.http.get<any[]>(this.api + 'doctor/' + userId + '/doctorProfile', options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }

  getCourseById(id: string): any {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.userToken })}
    console.log(this.auth.getUserToken())

    return this.http.get<any[]>(this.api + 'course/' + id, options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }

  getCourseInfo(id: string): any {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.userToken })}
    console.log(this.auth.getUserToken())

    return this.http.get<any[]>(this.api + 'course/courseDetails/' + id, options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }

  /*getLectureInfo(userId: string, courseId: string, lectureId: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.userToken })}

    return this.http.get<any[]>(this.api + 'user/' + userId + courseId + lectureId, options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }*/

  addCourse(formValue: any, id: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.profToken })}

      return this.http.post(this.api + 'course/' + id, formValue, options)
      .pipe(catchError(this.handleError<any>('addCourse')))
  } 

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of (result as T)
    }
  }

  }



  /*courses: Course[] = [
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
  ];*/