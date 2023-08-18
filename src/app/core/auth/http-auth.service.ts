import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

  public authenticate(userName: string, password: string): Observable<any> {
    return this.http
    .post(environment.apiUrl + '/user/login',
     {userName, password},
     {observe: 'response'})
    .pipe(
      map((res) => {
        const authToken = res.headers.get('x-access-token')??"";
        this.userService.setToken(authToken);
    })
    );
  }
}
