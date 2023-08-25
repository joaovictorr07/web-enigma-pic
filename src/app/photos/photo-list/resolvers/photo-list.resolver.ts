import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoModel } from '../../photo/models/photo.model';
import { HttpPhotoService } from '../../photo/services/http-photo.service';

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<PhotoModel[]>> {
  constructor(private service: HttpPhotoService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PhotoModel[]> {
    const userName = route.params['userName'];
    return this.service.listFromUserPaginated(userName, 1);
  }
}
