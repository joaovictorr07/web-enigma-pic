import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoadingModule } from '../shared/components/loading/loading.module';
import { MenuModule } from '../shared/components/menu/menu.module';
import { ToastNotificationModule } from '../shared/components/toast-notification/toast-notification.module';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';
import { RequestInterceptor } from './auth/request.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.componet';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastNotificationModule,
    LoadingModule,
    MenuModule,
    ShowIfLoggedModule,
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
