import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoModel } from './models/photo.model';
import { UploadPhotoModel } from './models/upload-photo.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { PhotoCommentModel } from './models/photo-comment.model';
import { AddPhotoCommentModel } from './models/add-photo-comment.model';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) {}

  listFromUser(userName: string) {
    return this.http.get<PhotoModel[]>(API + '/' + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const parametros = new HttpParams().append('page', page.toString());
    return this.http.get<PhotoModel[]>(API + '/' + userName + '/photos', {
      params: parametros,
    });
  }

  upload(uploadPhoto: UploadPhotoModel) {
    const formData = new FormData();
    formData.append('description', uploadPhoto.description);
    formData.append(
      'allowComments',
      uploadPhoto.allowComments ? 'true' : 'false'
    );
    formData.append('imageFile', uploadPhoto.file);
    return this.http.post(API + '/photos/upload', formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  findById(photoId: number): Observable<PhotoModel> {
    return this.http.get<PhotoModel>(API + '/photos/' + photoId);
  }

  getComments(photoId: number): Observable<PhotoCommentModel[]> {
    return this.http.get<PhotoCommentModel[]>(
      API + '/photos/' + photoId + '/comments'
    );
  }

  addComment(comment: AddPhotoCommentModel) {
    return this.http.post(API + '/photos/' + comment.photoId + '/comments', {
      commentText: comment.commentText,
    });
  }

  removePhoto(photoId: number) {
    return this.http.delete(API + '/photos/' + photoId);
  }

  like(photoId: number) {
    return this.http
      .post(API + '/photos/' + photoId + '/like', {}, { observe: 'response' })
      .pipe(map((res) => true))
      .pipe(
        catchError((err) => {
          return err.status == '304' ? of(false) : throwError(() => err);
        })
      );
  }
}
