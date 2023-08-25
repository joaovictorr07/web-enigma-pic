import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';

import { MessageTypeEnum } from './enum/alert-type.enum';
import { ToastNotificationModel as MessageModel } from './toast-notification';
import { ToastNotificationService } from './toast-notification.service';

@Component({
  selector: 'enigma-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: [],
})
export class ToastNotificationComponent implements OnDestroy {
  @Input() timeout: number = 3000;
  messages: MessageModel[] = [];
  private messageSubscriptions: Subscription;

  constructor(private toastNotificationService: ToastNotificationService) {
    this.messageSubscriptions = this.toastNotificationService
      .getAlert()
      .pipe(
        tap((message) => {
          if (message instanceof MessageModel) {
            this.messages.push(message);
            setTimeout(() => this.removeMessage(message), this.timeout);
          } else {
            this.clearMessage();
          }
        })
      )
      .subscribe();
  }

  private removeMessage(messageToRemove: MessageModel): void {
    this.messages = this.messages.filter(
      (message) => message != messageToRemove
    );
  }

  private clearMessage(): void {
    this.messages = [];
  }

  public getMessageClass(message: MessageModel): string {
    if (!message) {
      return '';
    }
    switch (message.alertType) {
      case MessageTypeEnum.DANGER:
        return 'alert alert-danger';
      case MessageTypeEnum.INFO:
        return 'alert alert-info';
      case MessageTypeEnum.WARNING:
        return 'alert alert-warning';
      case MessageTypeEnum.SUCESS:
        return 'alert alert-success';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.messageSubscriptions.unsubscribe();
  }
}
