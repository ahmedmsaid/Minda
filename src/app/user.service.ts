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

export class UserService {
  private api = "https://e-learning1.onrender.com/api/";
  userToken: string
  profToken: string
  info: any

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userToken = this.auth.getUserToken()
    this.profToken = this.auth.getProfToken()
   }

  getInfo(userId: any, token: string): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
    return this.http.get<any[]>(this.api + 'user/'+ userId+'/userProfile' , options)
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of (result as T)
    }
  }
}