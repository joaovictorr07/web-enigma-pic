import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

import { NewUserModel } from '../models/new-user.model';
import { HttpSignUpService } from './http-signup.service';

@Injectable()
export class SignupService {
  isSignupSucess = new BehaviorSubject<boolean | undefined>(undefined);

  constructor(
    private router: Router,
    private signUpService: HttpSignUpService,
    private toastNotificationService: ToastNotificationService
  ) {}

  public signUp(newUser: NewUserModel): void {
    this.signUpService.signUp(newUser).subscribe({
      complete: () => {
        this.toastNotificationService.sucessMessage(
          'Usuário cadastrado com sucesso!'
        );
        this.router.navigate(['']);
      },
      error: () => {
        this.isSignupSucess.next(false);
        this.toastNotificationService.dangerMessage(
          'Erro ao cadastrar usuário!'
        );
      },
    });
  }

  public getIsSignUpSucess(): Observable<boolean | undefined> {
    return this.isSignupSucess.asObservable();
  }
}
