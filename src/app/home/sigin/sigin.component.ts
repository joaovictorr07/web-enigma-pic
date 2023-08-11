import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Subscription, tap } from 'rxjs';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

import { PlatformDetectorService } from '../../core/plataform/platform-detector.service';
import { SiginService } from './sigin.service';

@Component({
  templateUrl: './sigin.component.html',
})
export class SigInComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private subscriptions!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private platformDetectorService: PlatformDetectorService,
    private messageService: ToastNotificationService,
    private siginService: SiginService
  ) {
    this.initListners();
  }

  private initListners() {
    this.subscriptions = this.siginService
      .getIsSucessLogged()
      .pipe(
        filter((value) => value != undefined),
        tap((isLoggedSucess) => {
          if (!isLoggedSucess) {
            this.platformDetectorService.isPlatformBrowser() &&
              this.renderer.selectRootElement('#userNameInput').focus();
          }
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
      this.renderer.selectRootElement('#userNameInput').focus();
  }

  public login(): void {
    if (this.loginForm.invalid) {
      this.messageService.warning('Verifique os dados e tente novamente');
      return;
    }
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
    this.siginService.login(userName, password);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
