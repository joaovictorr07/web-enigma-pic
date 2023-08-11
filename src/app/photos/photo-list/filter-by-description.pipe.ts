import { PhotoModel } from '../photo/models/photo.model';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'filterByDescription'})
export class filterByDescription implements PipeTransform {
  transform(photos: PhotoModel[], descriptionQuery: string) {
    descriptionQuery = descriptionQuery
      .trim()
      .toLowerCase();

    if(descriptionQuery){
      return photos.filter(photo =>
         photo.description.toLowerCase().includes(descriptionQuery)
         );
    } else {
      return photos;
    }
  }

}
