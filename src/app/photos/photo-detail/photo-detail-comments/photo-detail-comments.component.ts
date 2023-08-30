import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, Subscription, tap } from 'rxjs';

import { AddPhotoCommentModel } from '../../photo/models/add-photo-comment.model';
import { PhotoCommentModel } from '../../photo/models/photo-comment.model';
import { PhotoService } from '../../photo/services/photo.service';

@Component({
  selector: 'enigma-photo-detail-comments',
  templateUrl: './photo-detail-comments.component.html',
  styleUrls: ['./photo-detail-comments.component.css'],
})
export class PhotoDetailCommentsComponent implements OnInit, OnDestroy {
  @Input() photoId!: number;
  comments$!: Observable<PhotoCommentModel[] | undefined>;
  formGroup!: FormGroup;
  teste = false;
  visibledValidationMessage = false;
  comments: PhotoCommentModel[] | undefined = undefined;
  private subscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService
  ) {
    this.comments$ = this.photoService.getComments();
    this.initListner();
  }

  private initListner(): void {
    this.subscription = this.comments$
      .pipe(
        filter((value) => value != undefined),
        tap((commentsList) => {
          if (commentsList?.length == 0) {
            this.comments = undefined;
          } else {
            this.comments = commentsList;
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      comment: [null, [Validators.required, Validators.maxLength(300)]],
    });
  }

  public save(): void {
    if (this.formGroup.invalid) {
      this.visibledValidationMessage = true;
      return;
    }
    let comment: AddPhotoCommentModel = {
      photoId: this.photoId,
      commentText: this.formGroup.controls['comment'].value,
    };
    this.photoService.addComment(comment);
    this.formGroup.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
