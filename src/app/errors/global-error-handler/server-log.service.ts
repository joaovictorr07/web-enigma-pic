import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ServerLogModel } from './models/server-log.model';
import { Observable } from 'rxjs';

const URL_API_LOG = environment.serverLogUrl;

@Injectable({ providedIn: 'root' })
export class ServerLogService {
  constructor(private http: HttpClient) {}
  public log(log: ServerLogModel): Observable<any> {
    return this.http.post(URL_API_LOG + 'infra/log', log);
  }
}
