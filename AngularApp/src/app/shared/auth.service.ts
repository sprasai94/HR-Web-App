import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseURL = 'http://localhost:8848/api/users';
  readonly authURL = 'http://localhost:8848/api/auth';
  authToken = { token:"" }
  constructor(private http: HttpClient, public router:Router) { }

  createUser(user: User) {
    return this.http.post(this.baseURL, user);
  }

  login(user) {
    return this.http.post(this.authURL, user);

  }

  logout() {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    
  }
}
