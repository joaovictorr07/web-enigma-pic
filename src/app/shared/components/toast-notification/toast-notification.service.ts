import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { MessageTypeEnum } from './enum/alert-type.enum';
import { ToastNotificationModel } from './toast-notification';

@Injectable({ providedIn: 'root' })
export class ToastNotificationService {
  private messageSubject = new BehaviorSubject<
    ToastNotificationModel | undefined
  >(undefined);
  private keepAfterRouteChange = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
        } else {
          this.clearMessage();
        }
      }
    });
  }

  public sucessMessage(message: string, keepAfterRouteChange: boolean = true): void {
    this.setMessage(MessageTypeEnum.SUCESS, message, keepAfterRouteChange);
  }

  public warningMessage(message: string, keepAfterRouteChange: boolean = true
  ): void {
    this.setMessage(MessageTypeEnum.WARNING, message, keepAfterRouteChange);
  }

  public dangerMessage(message: string, keepAfterRouteChange: boolean = true): void {
    this.setMessage(MessageTypeEnum.DANGER, message, keepAfterRouteChange);
  }

  public infoMessage(message: string, keepAfterRouteChange: boolean = true): void {
    this.setMessage(MessageTypeEnum.INFO, message, keepAfterRouteChange);
  }

  public clearMessage(): void {
    this.messageSubject.next(undefined);
  }

  private setMessage(alertType: MessageTypeEnum, message: string, keepAfterRouteChange: boolean): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.messageSubject.next(new ToastNotificationModel(alertType, message));
  }

  public getAlert(): Observable<ToastNotificationModel | undefined> {
    return this.messageSubject.asObservable();
  }
}
