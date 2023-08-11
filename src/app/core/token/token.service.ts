import { Injectable } from "@angular/core";

const KEY = 'authToken';

@Injectable({providedIn: 'root'})
export class TokenService {

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public setToken(token: string): void {
    window.localStorage.setItem(KEY, token);

  }

  public getToken(): string | null {
    return window.localStorage.getItem(KEY);
  }

  public removeToken(): void {
    window.localStorage.removeItem(KEY);
  }
}
