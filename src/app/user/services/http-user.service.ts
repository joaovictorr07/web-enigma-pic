import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/core/user/user.model";
import { environment } from "src/environments/environment";

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {
  constructor(private http: HttpClient){}

  public searchByUserName(userName: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(API + '/user/search/' + userName);
  }
}
