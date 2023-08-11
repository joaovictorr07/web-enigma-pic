import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo.component';
import { NgModule } from "@angular/core";

@NgModule({declarations:[PhotoComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotoModule {}
