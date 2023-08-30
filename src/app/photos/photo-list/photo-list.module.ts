import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultButtonModule } from 'src/app/shared/components/buttons/default-button/default-button.module';

import { CardModule } from './../../shared/components/cards/card.module';
import { DarkOnHoverModule } from './../../shared/directives/dark-on-hover/dark-on-hover.module';
import { PhotoModule } from './../photo/photo.module';
import { LoadButtonComponent } from './components/load-button/load-button.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotosComponent } from './components/photos/photos.component';
import { SearchComponent } from './components/search/search.component';
import { filterByDescription } from './pipes/filter-by-description.pipe';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    filterByDescription,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    PhotoModule,
    CardModule,
    DarkOnHoverModule,
    RouterModule,
    DefaultButtonModule
  ],
})
export class PhotoListModule {}
