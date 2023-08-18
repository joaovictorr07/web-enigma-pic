import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Subscription, tap } from 'rxjs';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';
import { LowercaseValidator } from 'src/app/shared/validators/lower-case.validator';

import { PlatformDetectorService } from '../../core/plataform/platform-detector.service';
import { ConfirmPassWordValidator } from './validators/confirm-password.validator';
import { NewUserModel } from './models/new-user.model';
import { SignupService } from './services/signup.service';
import { UserNotTakenValidatorService } from './services/user-not-taken.validator.service';
import { UserNamePasswordValidator } from './validators/username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    private FormBuilder: FormBuilder,
    private signupService: SignupService,
    private platformDetectorService: PlatformDetectorService,
    private toastNotificationService: ToastNotificationService,
    private UserNotTakenValidatorService: UserNotTakenValidatorService
  ) {
    this.initListners();
  }

  private initListners(): void {
    this.subscription = this.signupService
      .getIsSignUpSucess()
      .pipe(
        filter((value) => value != undefined),
        tap((isSignUpSucess) => {
          if (!isSignUpSucess) {
            this.defineFocusInputEmail();
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.signupForm = this.FormBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            LowercaseValidator,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
          this.UserNotTakenValidatorService.checkUserNameTaken(),
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(14),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(14),
          ],
        ],
      },
      {
        validator: [UserNamePasswordValidator, ConfirmPassWordValidator],
      }
    );
  }

  ngAfterViewInit() {
    this.defineFocusInputEmail();
  }

  private defineFocusInputEmail(): void {
    this.platformDetectorService.isPlatformBrowser() &&
      this.renderer.selectRootElement('#inputEmail').focus();
  }

  public signUp(): void {
    if (this.signupForm.invalid) {
      this.toastNotificationService.warningMessage(
        'Verifique os dados e tente novamente'
      );
      this.defineFocusInputEmail();
      return;
    }
    let newUser = this.signupForm.getRawValue() as NewUserModel;
    this.signupService.signUp(newUser);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
