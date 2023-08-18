import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { UploadPhotoModel } from '../photo/models/upload-photo.model';
import { PhotoService } from '../photo/services/photo.service';

@Component({
  selector: 'enigma-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  formGroup!: FormGroup;
  file!: File;
  previewImage!: string;
  percentUploadValue$: Observable<number | undefined>
  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
  ) {
    this.percentUploadValue$ = this.photoService.getPercentUploadValue();
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      file: [null, [Validators.required]],
      description: [null, [Validators.maxLength(300), Validators.required]],
      allowComments: [true],
    });
  }

  public fileUpload(DOMevent: Event): void {
    const target = DOMevent.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => (this.previewImage = event.target?.result);
    reader.readAsDataURL(this.file);
  }

  public removePhotoSelected(): void {
    this.previewImage = '';
    this.formGroup.patchValue({
      file: null,
    });
  }

  public upload(): void {
    let dadosUpload: UploadPhotoModel = {
      description: this.formGroup.controls['description'].value,
      allowComments: this.formGroup.controls['allowComments'].value,
      file: this.file,
    };
    this.photoService.uploadPhoto(dadosUpload);
  }
}
