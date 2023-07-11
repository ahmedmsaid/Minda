import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
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
  path:any
  fpath:any
  update:any
  delete:any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.userToken = this.auth.getToken()
    this.profToken = this.auth.getToken()
   }

  getInfo(userId: any, token: string): Observable<any[]> {
    this.checkUserToken();
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
    return this.http.get<any[]>(this.api +this.fpath +'/'+ userId+'/' +this.path  , options)
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }
  userUpdate(formValue: any,userId: any, token: string): Observable<any[]> {
    this.checkUserToken();
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
    return this.http.put<any[]>(this.api + this.fpath +'/'+ userId,formValue, options)/*this.update +'/'+*/
    .pipe(
      catchError(error => {
        console.error('Error in addCourse', error);
        let errorMessage = 'An error occurred while submitting the quiz.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.log('Error caught', errorMessage); // Log the error message
        return throwError(errorMessage);
      })
    )
  }
  uploadimg(formValue: any,userId: any, token: string){
    this.checkUserToken();
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
      return this.http.put(this.api + this.fpath+'/'+ this.update +'/'+userId , formValue, options)
      .pipe(
        catchError(error => {
          console.error('Error in addCourse', error);
          let errorMessage = 'An error occurred while submitting the quiz.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          console.log('Error caught', errorMessage); // Log the error message
          return throwError(errorMessage);
        })
      )
  }
  
  deleteimg(id: string , token: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
    return this.http.delete(this.api + this.fpath + '/' +id +this.delete, options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 

  resetUser(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/new-password' ,formValue)
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }
  resetProf(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/new-password/Doc' ,formValue)
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }
  forgetUser(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset',formValue)
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }
  forgetProf(formValue: any,): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/resetDoc' , formValue)
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }
  tokenUser(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/check-token',formValue, )
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }
  tokenProf(formValue: any,): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/checkToken/Doc' , formValue)
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }

  checkUserToken() {
    if (this.auth.getToken()) {
      this.path='userProfile'
      this.fpath='user'
      this.update='updateProfile'
      this.delete='/profileImage'
    } else {
      this.path='doctorProfile'
      this.fpath='doctor'
      this.update='updateProfile'
      this.delete='/profileImage'
    }}
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of (result as T)
    }
  }
}