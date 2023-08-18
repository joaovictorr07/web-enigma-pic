import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, Subscription, tap } from 'rxjs';

import { PhotoModel } from '../photo/models/photo.model';
import { PhotoService } from '../photo/services/photo.service';

@Component({
  templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit, OnDestroy {
  photo$!: Observable<PhotoModel | undefined>;
  selectedPhoto: PhotoModel | undefined;
  private photoSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {
    this.photo$ = this.photoService.getSelectedPhoto();
    this.initListners();
  }

  private initListners(): void {
    this.photoSubscription = this.photo$
      .pipe(
        filter((value) => value != undefined),
        tap((photo) => {
          this.selectedPhoto = photo;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    let photoId = this.route.snapshot.params['photoId'];
    this.photoService.setSelectedPhoto(photoId);
  }

  public removePhoto(): void {
    if (this.selectedPhoto)
      this.photoService.deletePhoto(this.selectedPhoto?.id);
  }

  public like(photo: PhotoModel): void {
    this.photoService.like(photo);
  }

  ngOnDestroy(): void {
    this.photoService.setSelectedPhoto(undefined);
    this.photoSubscription.unsubscribe();
  }
}
