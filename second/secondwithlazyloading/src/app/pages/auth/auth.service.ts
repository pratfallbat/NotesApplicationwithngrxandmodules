import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string
  registered? : boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService{

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  constructor(private http:HttpClient,private router:Router){}
  // 
  signup(email : string,password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH1wK8AJY_pxOt_coVASu8xlQbuFyTl9c', {
      email: email,
      password: password,
      returnSecureToken: true
      
    }
    ).pipe(
      catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    );
    
  }

  handleAuthentication(email:string,userId:string,token:string,expiresIn  :number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData',JSON.stringify(user))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH1wK8AJY_pxOt_coVASu8xlQbuFyTl9c', {
      email: email,
      password: password,
      returnSecureToken: true
      
    }).pipe(
      catchError(this.handleError),tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
    );
    
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXIST':
        errorMsg = 'This email already exist'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exist exist'
      case 'INVALID_PASSWORD':
        errorMsg = 'This password entered is wrong'
        break;

      case 'USER_DISABLED':
        errorMsg = 'This user is disabled'
        break;
        
    }
    console.log(errorRes)
    console.log(errorMsg)
    return throwError(errorMsg)
    
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate:Date
    } = JSON.parse( localStorage.getItem('userData'))
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // the below token is alrealdy valid check user object getter token for more details
  
    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
}
  }
  autoLogout(expirationDuration:number) {
 this.tokenExpirationTimer=   setTimeout(() => {
      this.logout();
    }, expirationDuration);
}

  logout() {
     console.log('logout done')
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null; 
  }
}