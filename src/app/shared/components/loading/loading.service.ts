import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoadingType } from './loading-type';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  loadingSubject = new BehaviorSubject<LoadingType>(LoadingType.STOPPED);

  public startLoading(): void {
    this.loadingSubject.next(LoadingType.LOADING);
  }

  public stoppedLoading(): void {
    this.loadingSubject.next(LoadingType.STOPPED);
  }

  public getLoading(): Observable<LoadingType> {
    return this.loadingSubject.asObservable();
  }
}
