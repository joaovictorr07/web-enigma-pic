import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/plataform/platform-detector.service';

@Component({
  templateUrl: './sigin.component.html',
})
export class SigInComponent implements OnInit {
  loginForm!: FormGroup;
  fromUrl: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private renderer: Renderer2,
    private platformDetectorService: PlatformDetectorService,
    private messageService: ToastNotificationService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.fromUrl = params['fromUrl'];
    });
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

    this.authService.authenticate(userName, password).subscribe({
      complete: () => {
        this.messageService.sucess('Login realizado com sucesso');
        if (this.fromUrl) {
          this.route.navigateByUrl(this.fromUrl);
        } else {
          this.route.navigate(['user', userName]);
        }
      },
      error: (err) => {
        this.loginForm.reset();
        this.platformDetectorService.isPlatformBrowser() &&
        this.renderer.selectRootElement('#userNameInput').focus();
        this.messageService.danger('Usuário e senha inválidos');
      },
    });
  }
}
