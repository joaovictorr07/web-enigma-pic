import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HoverButtonModule } from 'src/app/shared/components/buttons/hover-button/hover-button.module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';

import { PhotoModule } from '../photo/photo.module';
import { PhotoOwnerOnlyDirective } from './directives/photo-owner-only/photo-owner.only.directive';
import { PhotoDetailCommentsComponent } from './photo-detail-comments/photo-detail-comments.component';
import { PhotoDetailComponent } from './photo-detail.component';

@NgModule({
  declarations: [PhotoDetailComponent, PhotoDetailCommentsComponent, PhotoOwnerOnlyDirective],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    ShowIfLoggedModule,
    HoverButtonModule,
  ],
  exports: [PhotoDetailComponent, PhotoDetailCommentsComponent],
})
export class PhotoDetailModule {}
