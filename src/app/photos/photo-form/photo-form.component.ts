import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { UploadPhotoModel } from '../photo/models/upload-photo.model';
import { PhotoService } from '../photo/services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'enigma-photo-form',
  templateUrl: './photo-form.component.html',
})
export class PhotoFormComponent implements OnInit {
  formGroup!: FormGroup;
  file!: File;
  previewImage!: string;
  percentUploadValue$: Observable<number | undefined>
  visibledValidationMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private routerService: Router
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

  private removePhotoSelected(): void {
    this.previewImage = '';
    this.formGroup.patchValue({
      file: null,
    });
  }

  public upload(): void {
    if(this.formGroup.invalid) {
      this.visibledValidationMessage = true;
      return;
    }
    let dadosUpload: UploadPhotoModel = {
      description: this.formGroup.controls['description'].value,
      allowComments: this.formGroup.controls['allowComments'].value,
      file: this.file,
    };
    this.photoService.uploadPhoto(dadosUpload);
  }

  public cancelar(): void {
    if(this.formGroup.controls['file'].value != null) {
      this.removePhotoSelected();
    } else {
      this.routerService.navigate(['']);
    }
  }
}
