import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

@Injectable({providedIn: 'root'})
export class SiginService implements OnInit {
  private isSucessLogged = new BehaviorSubject<boolean | undefined>(undefined);
  fromUrl: string | undefined;

  constructor(  private authService: AuthService,
    private route: Router,
    private messageService: ToastNotificationService,
    private activatedRoute: ActivatedRoute){}

    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.fromUrl = params['fromUrl'];
      });
    }

    public login(userName: string, password: string): void {
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
          this.isSucessLogged.next(false);
          this.messageService.danger('Usuário e senha inválidos');
        },
      });
    }

    public getIsSucessLogged(): Observable<boolean | undefined> {
      return this.isSucessLogged.asObservable();
    }
}
