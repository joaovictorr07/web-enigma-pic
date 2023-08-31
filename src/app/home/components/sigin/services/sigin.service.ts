import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpAuthService } from 'src/app/core/auth/http-auth.service';
import { UserService } from 'src/app/core/user/user.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

@Injectable()
export class SiginService {
  private isSucessLogged = new BehaviorSubject<boolean | undefined>(undefined);
  private fromUrl: string | undefined;

  constructor(
    private authService: HttpAuthService,
    private route: Router,
    private messageService: ToastNotificationService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private userService: UserService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.fromUrl = params['fromUrl'];
    });
  }

  public login(userName: string, password: string): void {
    this.authService.authenticate(userName, password).subscribe({
      complete: () => {
        this.messageService.sucessMessage('Login realizado com sucesso');
        this.userService.setListUsers([]);
        if (this.fromUrl) {
          this.route.navigateByUrl(this.fromUrl);
        } else {
          this.route.navigate(['user', userName]);
        }
      },
      error: () => {
        this.isSucessLogged.next(false);
        this.messageService.dangerMessage('Usuário e senha inválidos');
        this.loadingService.stoppedLoading();
      },
    });
  }

  public getIsSucessLogged(): Observable<boolean | undefined> {
    return this.isSucessLogged.asObservable();
  }
}
