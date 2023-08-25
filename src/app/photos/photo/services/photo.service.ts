import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

import { AddPhotoCommentModel } from '../models/add-photo-comment.model';
import { PhotoCommentModel } from '../models/photo-comment.model';
import { PhotoModel } from '../models/photo.model';
import { UploadPhotoModel } from '../models/upload-photo.model';
import { HttpPhotoService } from './http-photo.service';

@Injectable()
export class PhotoService {
  private selectedPhotoSubject = new BehaviorSubject<PhotoModel | undefined>(undefined);
  private commentsPhotoSubject = new BehaviorSubject<PhotoCommentModel[] | undefined>(undefined);
  private percentUploadValueSubject = new BehaviorSubject<number | undefined>(undefined);
  private listPhotosSubject = new BehaviorSubject<PhotoModel[]>([]);
  private hasMorePhotosInUserSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: ToastNotificationService,
    private httpPhotoService: HttpPhotoService
  ) {}

  public uploadPhoto(dadosUpload: UploadPhotoModel): void {
    this.httpPhotoService
      .upload(dadosUpload)
      .pipe(
        tap((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            if (event.total) {
              this.setPercentUploadValue(
                Math.round((100 * event.loaded) / event.total)
              );
            }
          } else if (event instanceof HttpResponse) {
            this.messageService.sucessMessage('Upload concluído com sucesso', true);
            this.router.navigate(['/user', this.userService.getUserName()]);
            this.setPercentUploadValue(undefined);
          }
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.messageService.warningMessage('Erro no upload da foto');
          this.setPercentUploadValue(undefined);
        },
      });
  }

  public deletePhoto(photoId: number): void {
    this.httpPhotoService.removePhoto(photoId).subscribe({
      complete: () => {
        this.messageService.sucessMessage('Foto excluída com sucesso');
        this.router.navigate(['/user', this.userService.getUserName()], {
          replaceUrl: true,
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.warningMessage('Erro na exclusão da foto');
      },
    });
  }

  public like(photo: PhotoModel): void {
    this.httpPhotoService
      .like(photo.id)
      .pipe(
        map((res) => {
          if (res) {
            this.setSelectedPhoto(photo.id);
          }
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.messageService.warningMessage('Erro ao curtir a foto');
        },
      });
  }

  public setPhotosListFromUserPaginated(
    userNameSelected: string,
    currentPage: number
  ): void {
    this.httpPhotoService
      .listFromUserPaginated(userNameSelected, currentPage)
      .pipe(
        map((res) => {
          if (res) {
            this.listPhotosSubject.next(res);
            if (res.length!) {
              this.setHasMorePhotosInUser(false);
            }
          }
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
        },
      });
  }

  public addComment(comment: AddPhotoCommentModel): void {
    this.httpPhotoService
      .addComment(comment)
      .pipe(
        map((res) => {
          if (res) {
            this.setSelectedPhoto(comment.photoId);
          }
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.messageService.warningMessage('Erro ao comentar a foto');
        },
      });
  }

  public setSelectedPhoto(photoId: number | undefined): void {
    if (photoId) {
      this.setComments(photoId);
      this.httpPhotoService.findById(photoId).subscribe((res) => {
        this.selectedPhotoSubject.next(res);
      });
    } else {
      this.selectedPhotoSubject.next(undefined);
    }
  }

  public setComments(photoId: number): void {
    if (photoId) {
      this.httpPhotoService.getComments(photoId).subscribe((res) => {
        this.commentsPhotoSubject.next(res);
      });
    } else {
      this.selectedPhotoSubject.next(undefined);
    }
  }

  public setPercentUploadValue(percentUpload: number | undefined): void {
    this.percentUploadValueSubject.next(percentUpload);
  }

  public setHasMorePhotosInUser(hasMore: boolean): void {
    this.hasMorePhotosInUserSubject.next(hasMore);
  }

  public getSelectedPhoto(): Observable<PhotoModel | undefined> {
    return this.selectedPhotoSubject.asObservable();
  }

  public getComments(): Observable<PhotoCommentModel[] | undefined> {
    return this.commentsPhotoSubject.asObservable();
  }

  public getPercentUploadValue(): Observable<number | undefined> {
    return this.percentUploadValueSubject.asObservable();
  }

  public getListPhotos(): Observable<PhotoModel[]> {
    return this.listPhotosSubject.asObservable();
  }

  public getHasMorePhotosInUser(): Observable<boolean> {
    return this.hasMorePhotosInUserSubject.asObservable();
  }
}
