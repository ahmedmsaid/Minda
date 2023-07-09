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
  path:any
  fpath:any
  update:any
  delete:any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.userToken = this.auth.getUserToken()
    this.profToken = this.auth.getProfToken()
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
    .pipe(catchError(this.handleError<any[]>('profile', [])))
  }
  uploadimg(formValue: any,userId: any, token: string){
    this.checkUserToken();
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
      return this.http.put(this.api + this.fpath+'/'+ this.update +'/'+userId , formValue, options)
      .pipe(catchError(this.handleError<any>('upload')))
  }
  deleteimg(id: string , token: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
    return this.http.delete(this.api + this.fpath + '/' +id +this.delete, options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 
  checkUserToken() {
    if (this.auth.getUserToken()) {
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