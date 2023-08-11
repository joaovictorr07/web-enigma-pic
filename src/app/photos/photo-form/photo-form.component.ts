import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';

import { UploadPhotoModel } from '../photo/models/upload-photo.model';
import { PhotoService } from '../photo/photo.service';
import { tap } from 'rxjs';

@Component({
  selector: 'enigma-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  formGroup!: FormGroup;
  file!: File;
  previewImage!: string;
  percentDone: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private messageService: ToastNotificationService,
    private userService: UserService
  ) {}

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
    this.photoService
      .upload(dadosUpload)
      .pipe(
        tap((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            if (event.total) {
              this.percentDone = Math.round((100 * event.loaded) / event.total);
            }
          } else if (event instanceof HttpResponse) {
            this.messageService.sucess('Upload concluído com sucesso', true);
            this.router.navigate(['/user', this.userService.getUserName()]);
            this.percentDone = 0;
          }
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.messageService.warning('Erro no upload da foto');
        },
      });
  }
}
