import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { NewUserModel } from '../models/new-user.model';

const API = environment.apiUrl;
@Injectable()
export class HttpSignUpService {
  constructor(private http: HttpClient) {}

  public checkUserNameTaken(userName: string): Observable<boolean> {
    return this.http.get<boolean>(API + '/user/exists/' + userName);
  }

  public signUp(newUser: NewUserModel): Observable<any> {
    return this.http.post(API + '/user/signup', newUser);
  }
}
