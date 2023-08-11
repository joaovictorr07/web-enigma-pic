import { NgModule } from '@angular/core';
import { ToastNotificationComponent } from './toast-notification.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ToastNotificationComponent],
  imports: [CommonModule],
  exports: [ToastNotificationComponent],
})
export class ToastNotificationModule {}
