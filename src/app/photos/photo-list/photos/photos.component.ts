import { PhotoModel } from '../../photo/models/photo.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'enigma-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnChanges {
  @Input() photos: PhotoModel[] = [];
  rows: any [] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['photos'])
      this.rows = this.groupColumns(this.photos);
  }

  private groupColumns(photos: PhotoModel[]): PhotoModel[][] {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 3){
      newRows.push(photos.slice(index, index + 3));
    }

    return newRows;
  }

}
