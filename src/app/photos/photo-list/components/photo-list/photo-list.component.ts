import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { PhotoModel } from 'src/app/photos/photo/models/photo.model';
import { PhotoService } from 'src/app/photos/photo/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photos: PhotoModel[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  Subscription: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {
    this.photoService.setHasMorePhotosInUser(true);
  }

  ngOnInit(): void {
    this.initListners();
  }
  private initListners(): void {
    let initPhotosSubscriptions = this.activatedRoute.params.subscribe(
      (params) => {
        this.userName = params['userName'];
        this.photos = [];
        this.photos = this.activatedRoute.snapshot.data['photos'];
        if(this.photos.length == 0){
          this.photoService.setHasMorePhotosInUser(false);
        }
      }
    );
    let listPhotosPaginatedSubscription = this.photoService
      .getListPhotos()
      .pipe(
        tap((photos) => {
          this.filter = '';
          this.photos = this.photos.concat(photos);
        })
      )
      .subscribe();
    let hasMorePhotoSubscription = this.photoService
      .getHasMorePhotosInUser()
      .pipe(
        tap((hasMore) => {
          this.hasMore = hasMore;
        })
      )
      .subscribe();
    this.Subscription.push(
      initPhotosSubscriptions,
      listPhotosPaginatedSubscription,
      hasMorePhotoSubscription
    );
  }

  public load(): void {
    this.photoService.setPhotosListFromUserPaginated(
      this.userName,
      ++this.currentPage
    );
  }

  ngOnDestroy(): void {
    this.photoService.clearListPhotos();
    this.Subscription.forEach((s) => s.unsubscribe());
  }
}
