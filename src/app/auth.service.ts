import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { IUser } from "./user.model";
import { IProf } from "./prof.model";
import { LoginComponent } from "./login/login.component";
import jwtDecode from "jwt-decode";

@Injectable()

export class AuthService {
    currentUser: any
    currentProf: any
    userToken: any
    profToken: any
    token: any
    private api = "https://e-learning1.onrender.com/api/";

    constructor(private http: HttpClient) {}

    loginUser( email: string, password: string) {
        let loginInfo = { email: email, password: password}
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

        return this.http.post(this.api +  'auth/userlogin', loginInfo, options)
        .pipe(tap((data: any) => {
                    this.token = data
                    localStorage.setItem('auth_token', this.token);
                }))
        .pipe(catchError( err => {
                    return of(false)
                }))
    }
    
    logout() {
      this.token = null;
      localStorage.removeItem('auth_token');
    }

    // getToken() {
    //     return this.userToken
    // }

    getToken() {
      if (!this.token) {
        this.token = localStorage.getItem('auth_token');
      }
      return this.token;
    }

    getUserId() {
        var decoded = jwtDecode(this.userToken)
    }

    loginProf( email: string, password: string) {
        let loginInfo = { email: email, password: password}
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

        return this.http.post(this.api +  'auth/doctorlogin', loginInfo, options)
        .pipe(tap( (data: any) => {
                    this.token = data
                    localStorage.setItem('auth_token', this.token);
                }))
        .pipe(catchError( err => {
                    return of(false)
                }))
    }

    // getToken(){
    //     return this.profToken
    // }

    signUpUser(user: IUser) {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
        let newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            firstName: user.firstName,
            lastName: user.lastName,
        }

        return this.http.post(this.api + 'user/signup', newUser, options)
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

    signUpProf(prof: IProf) {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
        let newProf = {
            email: prof.email,
            password: prof.password,
            confirmPassword: prof.confirmPassword,
            firstName: prof.firstName,
            lastName: prof.lastName,
            code: prof.code
        }

        return this.http.post(this.api + 'doctor/signup', newProf, options)
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

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error)
          return of (result as T)
        }
      }
}