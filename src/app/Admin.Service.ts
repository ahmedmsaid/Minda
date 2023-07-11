import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()

export class AdminService {
  private api = "https://e-learning1.onrender.com/api/";
  userToken: string
  profToken: string
  info: any
  path: any;
  fpath: any;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userToken = this.auth.getToken()
    this.profToken = this.auth.getToken()
   }

   putcode(userId: any, token: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('x-auth-token', token);
    return this.http.post<any>(this.api + 'specialCode/' + userId, null, { headers, observe: 'response' })
      .pipe(
        catchError(this.handleError<any>('putcode'))
      );
  }
  getusers(): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api + 'user/', options)
    .pipe(catchError(this.handleError<any[]>('getusers', [])))
  }
  deleteuser(id: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api + 'user/specficUser/' + id , options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 
  getcodes(): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api + 'specialCode/specialCode', options)
    .pipe(catchError(this.handleError<any[]>('getcodes', [])))
  }
  getcourses(): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api + 'course/admin/getCourses', options)
    .pipe(catchError(this.handleError<any[]>('getcorses', [])))
  }
  enroll(formValue: any,cId: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.put(this.api + 'course/'+cId+'/enroll' , formValue, options)
      .pipe(catchError(this.handleError<any>('enroll')))
  } 
  getusersforDetail(Id:string): Observable<any[]> {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api + 'course/'+Id+'/getusersEnrolled', options)
    .pipe(catchError(this.handleError<any[]>('getusers', [])))
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of (result as T)
    }
  }
}