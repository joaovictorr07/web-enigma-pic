import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from '../../photo/photo.service';
import { Observable, switchMap, take, tap } from 'rxjs';
import { PhotoCommentModel } from '../../photo/models/photo-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPhotoCommentModel } from '../../photo/models/add-photo-comment.model';

@Component({
  selector: 'enigma-photo-detail-comments',
  templateUrl: './photo-detail-comments.component.html',
  styleUrls: ['./photo-detail-comments.component.css']
})
export class PhotoDetailCommentsComponent implements OnInit {
  @Input() photoId!: number;
  comments$!: Observable<PhotoCommentModel[]>;
  formGroup!: FormGroup;
  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.buildFormGroup();
  }

  private buildFormGroup(): void {
    this.formGroup =  this.formBuilder.group({
      comment: [null, [Validators.maxLength(300)]]
    })
  }

  public save(): void {
    let comment: AddPhotoCommentModel = {
      photoId: this.photoId,
      commentText: this.formGroup.controls['comment'].value,
    }
    this.comments$ = this.photoService.addComment(comment)
    .pipe(switchMap(()=> this.photoService.getComments(this.photoId)))
    .pipe(tap(() => {
      this.formGroup.reset();
    }))
}
}
