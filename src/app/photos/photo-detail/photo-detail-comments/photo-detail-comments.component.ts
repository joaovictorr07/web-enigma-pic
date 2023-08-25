import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AddPhotoCommentModel } from '../../photo/models/add-photo-comment.model';
import { PhotoCommentModel } from '../../photo/models/photo-comment.model';
import { PhotoService } from '../../photo/services/photo.service';

@Component({
  selector: 'enigma-photo-detail-comments',
  templateUrl: './photo-detail-comments.component.html',
  styleUrls: ['./photo-detail-comments.component.css'],
})
export class PhotoDetailCommentsComponent implements OnInit {
  @Input() photoId!: number;
  comments$!: Observable<PhotoCommentModel[] | undefined>;
  formGroup!: FormGroup;
  visibledValidationMessage = false;
  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService
  ) {
    this.comments$ = this.photoService.getComments();
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      comment: [null, [Validators.maxLength(300)]],
    });
  }

  public save(): void {
    if(this.formGroup.invalid) {
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
}
