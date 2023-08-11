import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from './../token/token.service';
import { UserModel } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  private userName: string | undefined;
  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }
  public setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }
  public getUser(): Observable<UserModel | null> {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify(): void {
    const token = this.tokenService.getToken();
    const user = jwtDecode(token ?? '') as UserModel;
    this.userName = user.name;
    this.userSubject.next(user);
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  public isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  public getUserName(): string | undefined {
    return this.userName;
  }
}
