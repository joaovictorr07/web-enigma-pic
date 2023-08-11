import { NgModule } from '@angular/core';
import { PhotoDetailComponent } from './photo-detail.component';
import { CommonModule } from '@angular/common';
import { PhotoModule } from '../photo/photo.module';
import { PhotoDetailCommentsComponent } from './photo-detail-comments/photo-detail-comments.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoOwnerOnlyDirective } from './directives/photo-owner-only/photo-owner.only.directive';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
  declarations: [PhotoDetailComponent, PhotoDetailCommentsComponent, PhotoOwnerOnlyDirective],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    ShowIfLoggedModule
  ],
  exports: [PhotoDetailComponent, PhotoDetailCommentsComponent],
})
export class PhotoDetailModule {}
