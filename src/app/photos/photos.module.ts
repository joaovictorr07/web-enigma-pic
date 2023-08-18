import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoDetailModule } from './photo-detail/photo-detail.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoService } from './photo/services/photo.service';

@NgModule({
  imports: [
    CommonModule,
    PhotoModule,
    PhotoListModule,
    PhotoFormModule,
    PhotoDetailModule,
  ],
  providers: [PhotoService],
})
export class PhotosModule {}
