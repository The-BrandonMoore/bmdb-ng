import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.class';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/user-login.class';

const URL = 'http://localhost:5284/api/Users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(userLogin: UserLogin): Observable<User> {
    return this.http.post(URL + '/login', userLogin) as Observable<User>;
  }
}
