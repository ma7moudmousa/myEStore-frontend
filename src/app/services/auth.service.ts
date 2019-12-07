import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  url: string = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) {
  }

  checkAuth(loginData, callback) {
    this.http.post(this.url, loginData).subscribe(response => {
      if (response && (response as any).token) {
        localStorage.setItem("token", (response as any).token);
        callback(true);
      }
      else {
        callback(false);
      }
    }, (error) => {
      callback(false);
    });
  }

  islogedIn() {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }
  currentUser() {
    let token = localStorage.getItem("token");
    if (token) {
      const helper = new JwtHelperService();
      const user = helper.decodeToken(token);
      return user;
    } else {
      return null;
    }
  }


}
