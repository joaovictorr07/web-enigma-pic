import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';
import { LowercaseValidator } from 'src/app/shared/validators/lower-case.validator';

import { PlatformDetectorService } from '../../core/plataform/platform-detector.service';
import { NewUserModel } from './new-user.model';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { UserNamePasswordValidator } from './username-password.validator';
import { ConfirmPassWordValidator } from './confirm-password.validator';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserNotTakenValidatorService],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  @ViewChild('inputEmail') inputEmail!: ElementRef<HTMLInputElement>;

  constructor(
    private FormBuilder: FormBuilder,
    private UserNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private toastNotificationService: ToastNotificationService
  ) {}

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
        confirmPassword: ['',  [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],],
      },
      {
        validator: [UserNamePasswordValidator, ConfirmPassWordValidator],
      }
    );
  }

  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
      this.inputEmail.nativeElement.focus();
  }

  signUp() {
    if (this.signupForm.invalid) {
      this.toastNotificationService.warning(
        'Verifique os dados e tente novamente'
      );
      return;
    }
    const newUser = this.signupForm.getRawValue() as NewUserModel;
    this.signUpService.signUp(newUser).subscribe({
      complete: () => {
        this.toastNotificationService.sucess('Usuário cadastrado com sucesso');
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastNotificationService.danger('erro ao cadastrar usuário');
      },
    });
  }
}
