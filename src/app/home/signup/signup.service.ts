import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { NewUserModel } from './new-user.model';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
@Injectable()
export class SignUpService {

  constructor(private http: HttpClient){}

  checkUserNameTaken(userName: string) {

    return this.http.get(API + '/user/exists/' + userName);
  }

  signUp(newUser: NewUserModel){
    return this.http.post(API + '/user/signup', newUser);
  }
}
