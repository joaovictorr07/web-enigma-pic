import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';

import { UserModel } from '../user/user.model';
import { UserService } from './../user/user.service';

@Component({
  selector: 'enigma-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  userLogged!: UserModel | null;
  private subscription: Subscription;
  constructor(private userService: UserService, private router: Router) {
    this.subscription = this.userService
      .getUser()
      .pipe(
        tap((user) => {
          this.userLogged = user;
        })
      )
      .subscribe();
  }

  public logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
