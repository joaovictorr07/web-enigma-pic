import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastNotificationModel } from './toast-notification';
import { MessageTypeEnum } from './enum/alert-type.enum';
import { NavigationStart, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ToastNotificationService {
  private messageSubject = new BehaviorSubject<ToastNotificationModel | undefined>(undefined);
  private keepAfterRouteChange = true;
  constructor(
    private router: Router
  ) {
  this.router.events.subscribe(event => {
    if(event instanceof NavigationStart) {
      if(this.keepAfterRouteChange) {
      } else {
        this.clear();
      }
    }
  })
  }

  public sucess(message: string, keepAfterRouteChange: boolean = true): void {
    this.setMessage(MessageTypeEnum.SUCESS, message,keepAfterRouteChange);
  }

  public warning(message: string, keepAfterRouteChange: boolean = true): void {
    this.setMessage(MessageTypeEnum.WARNING, message, keepAfterRouteChange);
  }

  public danger(message: string,keepAfterRouteChange: boolean = true): void {
    this.setMessage(MessageTypeEnum.DANGER, message,keepAfterRouteChange);
  }

  public info(message: string, keepAfterRouteChange: boolean = true): void {
    this.setMessage(MessageTypeEnum.INFO, message,keepAfterRouteChange);
  }

  private setMessage(alertType: MessageTypeEnum, message: string, keepAfterRouteChange: boolean): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.messageSubject.next(new ToastNotificationModel(alertType, message));
  }

  public getAlert(): Observable<ToastNotificationModel | undefined> {
   return this.messageSubject.asObservable();
  }

  public clear(): void {
    this.messageSubject.next(undefined)
  }
}
