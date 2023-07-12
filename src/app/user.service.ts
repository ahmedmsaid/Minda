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
  info: any
  path:any
  fpath:any
  update:any
  delete:any
  constructor(private http: HttpClient, private auth: AuthService) {}
  getInfo(userId: any): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api +'user/'+ userId+'/userProfile'  , options)
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
  getInfoProf(userId: any): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api +'doctor/'+ userId+'/doctorProfile'  , options)
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
  userUpdate(formValue: any,userId: any): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.put<any[]>(this.api +'user/'+ userId,formValue, options)
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
  userUpdateprof(formValue: any,userId: any): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.put<any[]>(this.api +'doctor/'+ userId,formValue, options)/*this.update +'/'+*/
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
  uploadimg(formValue: any,userId: any){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.put(this.api +'user/updateProfile/'+userId , formValue, options)
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
  uploadimgprof(formValue: any,userId: any){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.put(this.api +'doctor/updateProfile/'+userId , formValue, options)
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
  deleteimg(id: string ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api +'user/' +id +'/profileImage', options)
      .pipe(catchError(this.handleError<any>('delete')))
  }
  deleteimgprof(id: string ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api +'doctor/' +id +'/profileImage', options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 

  resetUser(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/new-password' ,formValue)
    .pipe(
      catchError(error => {
        console.error('Error in addCourse', error);
        let errorMessage = 'An error occurred .';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.log('Error caught', errorMessage); // Log the error message
        return throwError(errorMessage);
      })
    )
  }
  resetProf(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/new-password/Doc' ,formValue)
    .pipe(
      catchError(error => {
        console.error('Error in addCourse', error);
        let errorMessage = 'An error occurred .';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.log('Error caught', errorMessage); // Log the error message
        return throwError(errorMessage);
      })
    )
  }
  forgetUser(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset',formValue)
    .pipe(
      catchError(error => {
        console.error('Error in addCourse', error);
        let errorMessage = 'This Email IS InValid.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.log('Error caught', errorMessage); // Log the error message
        return throwError(errorMessage);
      })
    )
  }
  forgetProf(formValue: any,): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/resetDoc' , formValue)
    .pipe(
      catchError(error => {
        console.error('Error in addCourse', error);
        let errorMessage = 'User not found!';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.log('Error caught', errorMessage); // Log the error message
        return throwError(errorMessage);
      })
    )
  }
  tokenUser(formValue: any): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/check-token',formValue, )
    .pipe(
      catchError(error => {
        console.error('Error in addCourse', error);
        let errorMessage = 'This Token IS InValid.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.log('Error caught', errorMessage); // Log the error message
        return throwError(errorMessage);
      })
    )
  }
  tokenProf(formValue: any,): Observable<any[]> {
    return this.http.post<any[]>(this.api +'forgetPass/reset/checkToken/Doc' , formValue)
    .pipe(
      catchError(error => {
        console.error('Error in addCourse', error);
        let errorMessage = 'This Token IS InValid.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.log('Error caught', errorMessage); // Log the error message
        return throwError(errorMessage);
      })
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of (result as T)
    }
  }
}