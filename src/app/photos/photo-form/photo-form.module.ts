import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from './photo-form.component';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-click/immediate-click.module';
import { HoverButtonModule } from 'src/app/shared/components/buttons/hover-button/hover-button.module';

@NgModule({
  declarations:[
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    RouterModule,
    PhotoModule,
    ImmediateClickModule,
    HoverButtonModule,
  ]
})
export class PhotoFormModule{}
