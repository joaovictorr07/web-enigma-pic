import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastNotificationComponent } from './toast-notification.component';

@NgModule({
  declarations: [ToastNotificationComponent],
  imports: [CommonModule],
  exports: [ToastNotificationComponent],
})
export class ToastNotificationModule {}
