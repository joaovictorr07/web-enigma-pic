import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { environment } from 'src/environments/environment';
import * as StackTrace from 'stacktrace-js';

import { ServerLogModel } from './models/server-log.model';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private serverlogService: ServerLogService
  ) {}

  handleError(error: any): void {
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const router = this.injector.get(Router);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const user = userService.getUserName();
    const message = error.message ? error.message : error.toString();
    if (environment.production) {
      router.navigate(['/error']);
    }
    StackTrace.fromError(error).then((stackFrames) => {
      const stackAsString = stackFrames.map((sf) => sf.toString()).join('\n');
      let log: ServerLogModel = {
        message: message,
        url: url,
        userName: user,
        stack: stackAsString,
      };
      this.serverlogService.log(log).subscribe({
        complete: () => {
          console.log('ErrorLog on serverLog');
        },
        error: (err) => {
          console.log(err);
          console.log('Error on send log to server');
        },
      });
    });
  }
}
