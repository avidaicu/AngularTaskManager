import { Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserName: string = null;

  constructor(private httpClient: HttpClient, private jwtHelperService: JwtHelperService) { }

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    console.log('loginViewModel', loginViewModel);
    return this.httpClient.post<any>("http://localhost:3000/users", loginViewModel, {responseType: 'json'})
    .pipe(map(user => {
      if(user){
        console.log('user.UserName', user.userName);
        this.currentUserName = user.userName;
        sessionStorage.currentUser = JSON.stringify(user);
      }
      return user;
    }))
  }

  public Logout() {
    this.currentUserName = null;
    sessionStorage.removeItem('currentUser');
  }

  // public isAuthenticated() : boolean
  // {
  //   var token = sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser")).token : null;
  //   if (this.jwtHelperService.isTokenExpired())
  //   {
  //     return false; //token is not valid
  //   }
  //   else
  //   {
  //     return true; //token is valid
  //   }
  // }
}

