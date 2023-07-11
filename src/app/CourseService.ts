import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

export class CourseService {
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
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api + 'course/' + id, options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }

  getCourseInfo(id: string): any {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api + 'course/couseInfo/' + id, options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }
  getCourseInfoDoc(id: string): any {
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.get<any[]>(this.api + 'course/doctor/couseInfo/' + id, options)
    .pipe(catchError(this.handleError<any[]>('getCourses', [])))
  }
  addCourse(formValue: any, id: string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.post(this.api + 'course/' + id, formValue, options).pipe(
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

  addLec1(formValue: any,cId: string, id: string ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.post(this.api + 'lecture/' + cId + '/' + id, formValue, options)
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
  getLec(lId: string, cId: string  ): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'lecture/lec/' + lId + '/course/' + cId, options)
      .pipe(catchError(this.handleError<any>('addCourse')))
  } 
  addQuiz(formValue: any,cId: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}

      return this.http.post(this.api + 'quiz/courses/' + cId + '/quizze' , formValue, options)
      .pipe(catchError(this.handleError<any>('addQuiz')))
  } 
  getQuiz(qId: string, cId: string , token: string ): any{
    this.checkUserToken();
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
      return this.http.get(this.api + 'quiz/' + qId + '/' + cId + '/forDoc', options)
      .pipe(catchError(this.handleError<any>('getQuiz')))
  } 
  getLecUser(lId: string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'lecture/lec/' + lId , options)
      .pipe(catchError(this.handleError<any>('addCourse')))
  }
  getQuizUser(qId: string, cId: string , token: string ): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': token})}
      return this.http.get(this.api + 'quiz/' + qId +'/'+ cId, options)
      .pipe(catchError(this.handleError<any>('getQuiz')))
  }
  getResult(cId: string ,qId: string, uId: string,  token: string ): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': token})}
      return this.http.get(this.api + 'quiz/courses/' + cId+'/quizzes/'+ qId +'/user/'+ +uId, options)
      .pipe(catchError(this.handleError<any>('getresult')))
  }
  postQuizUser(formValue: any, cId: string, qId: string, token: string): any {
    let options = { headers: new HttpHeaders({ 'x-auth-token': token })}
    return this.http.post(this.api + 'quiz/courses/' + cId + '/quizzes/' + qId + '/submit', formValue, options)
      .pipe(
        catchError(error => {
          let errorMessage = 'An error occurred while submitting the quiz.';
          if (error.error && error.error.message) {
            errorMessage = 'Error Ocurred';
          }
          return throwError(errorMessage);
        })
      );
  }
  
  getDetail(cId: string ,qId: string,  token: string ): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': token})}
      return this.http.get(this.api + 'quiz/courseId/' + cId+'/quizId/'+ qId , options)
      .pipe(catchError(this.handleError<any>('getresult')))
  }

  editLec(formValue: any,id: string ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.put(this.api + 'lecture/lectureData/' + id, formValue, options)
      .pipe(catchError(this.handleError<any>('update')))
  } 
  deleteLec(Lid: string,id: string ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api + 'lecture/' + Lid + '/course/' +id, options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 
  deleteQuiz(id: string ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api + 'quiz/quizzes/' + id , options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 
  deleteCourse(id: number ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api + 'course/' +id, options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 
  uploadVideo(formValue: any,lId: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.put(this.api + 'lecture/lec/'+lId+'/videos' , formValue, options)
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
  updateCourse(formValue: any,cId: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.put(this.api + 'course/updateCourseInfo/'+cId , formValue, options)
      .pipe(catchError(this.handleError<any>('update')))
  } 
  
  addAssignment(formValue: any,cId: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.post(this.api + 'assignment/courses/' + cId + '/assignments' , formValue, options)
      .pipe(catchError(this.handleError<any>('addAssignment')))
  } 
  getAssignmentdoc(Id: string, dId: string ): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'assignment/course/' + Id + '/doctor/' + dId +'/assignments' , options)
      .pipe(catchError(this.handleError<any>('getQuiz')))
  }
  answerAssignment(formValue: any,cId: string, aId: string ): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.post(this.api + 'assignment/courses/' + cId + '/assignments/' + aId +'/submit',formValue, options)
      .pipe(catchError(this.handleError<any>('getassign')))
  }
  getuserAnswerAssignment(cId:string,aId: string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'assignment/courses/' + cId + '/assignments/'+ aId + '/answers' , options)
      .pipe(catchError(this.handleError<any>('getanswer')))
  }
  getAssignmentdetails(cId: string,aId: string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'assignment/courses/' + cId + '/assignments/'+ aId + '/responses'  , options)
      .pipe(catchError(this.handleError<any>('getanswer')))
  }
  postdegAssignment(formValue: any,cId: string,aId: string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.post(this.api + 'assignment/courses/' + cId + '/assignments/'+ aId + '/score' , formValue,options)
      .pipe(catchError(this.handleError<any>('getanswer')))
  }
  getAssignmentforuser(cId: string,uId: string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'course/' + cId + '/user/'+ uId + '/assignments'  , options)
      .pipe(catchError(this.handleError<any>('getassign')))
  }
  getDetailAssignmentforuser(cId: string,uId: string,aid:string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'assignment/course/' + cId + '/assignment/' +aid  , options)
      .pipe(catchError(this.handleError<any>('getassign')))
  }
  addPost(formValue: any,cId: string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.post(this.api + 'post/courses/' + cId + '/posts' , formValue, options)
      .pipe(catchError(this.handleError<any>('addpost')))
  } 
  addComment(formValue: any,cId: string,pId:string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.post(this.api + 'comment/courses/' + cId + '/posts/'+pId+'/comments' , formValue, options)
      .pipe(catchError(this.handleError<any>('addpost')))
  } 
  deleteComment(id: string,pid:string,cid:string ){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api + 'comment/courses/' + id +'/posts/'+pid +'/comments/'+cid, options)
      .pipe(catchError(this.handleError<any>('delete')))
  } 
  deletePost(cid: string ,pid:string){
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
    return this.http.delete(this.api + 'post/courses/' +cid +'/posts/'+pid, options)
      .pipe(catchError(this.handleError<any>('delete')))
  }
  getPost(cId: string): any{
    let options = { headers: new HttpHeaders({ 'x-auth-token': this.auth.getToken() })}
      return this.http.get(this.api + 'post/courses/' + cId + '/posts', options)
      .pipe(catchError(this.handleError<any>('getpost')))
  }
  checkUserToken() {
    if (this.auth.getToken()) {
      this.path='/forDoc'
      this.fpath='quiz/'
    } else {
      this.path='doctorProfile'
      this.fpath='doctor'
    }} 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of (result as T)
    }
  }

  }