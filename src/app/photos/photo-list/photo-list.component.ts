import { PhotoService } from './../photo/photo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoModel } from '../photo/models/photo.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {


  photos: PhotoModel[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  Subscription!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService : PhotoService,
    ) { }

  ngOnInit(): void {
    this.Subscription = this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'];
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }
  load (){
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      })
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
