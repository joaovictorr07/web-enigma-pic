import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpUserService } from 'src/app/user/services/http-user.service';

import { TokenService } from './../token/token.service';
import { UserModel } from './user.model';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  private userName: string | undefined;
  private listUsersSubject = new BehaviorSubject<UserModel[]>([]);

  constructor(private tokenService: TokenService,
    private httpUserService: HttpUserService,
    private messageService: ToastNotificationService,) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  public setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  public setListUsers(listUser: UserModel[]): void {
    this.listUsersSubject.next(listUser);
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
    this.listUsersSubject.next([]);
  }

  public searchByUserName(userName: string): void {
    this.httpUserService.searchByUserName(userName)
    .pipe(map((listUser) => {
      this.setListUsers(listUser);
    }))  .subscribe({
      error: (_err) => {

        this.messageService.warningMessage('Erro ao pesquisar o usuário');
      },
    });
  }

  public isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  public getUserName(): string | undefined {
    return this.userName;
  }

  public getUser(): Observable<UserModel | null> {
    return this.userSubject.asObservable();
  }

  public getListUsers(): Observable<UserModel[]> {
    return this.listUsersSubject.asObservable();
  }


}
