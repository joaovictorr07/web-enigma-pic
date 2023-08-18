import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoModel } from '../models/photo.model';
import { UploadPhotoModel } from '../models/upload-photo.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { PhotoCommentModel } from '../models/photo-comment.model';
import { AddPhotoCommentModel } from '../models/add-photo-comment.model';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class HttpPhotoService {
  constructor(private http: HttpClient) {}

  public listFromUser(userName: string): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(API + '/' + userName + '/photos');
  }

  public listFromUserPaginated(userName: string, page: number): Observable<PhotoModel[]> {
    const parametros = new HttpParams().append('page', page.toString());
    return this.http.get<PhotoModel[]>(API + '/' + userName + '/photos', {
      params: parametros,
    });
  }

  public upload(uploadPhoto: UploadPhotoModel): Observable<any> {
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

  public findById(photoId: number): Observable<PhotoModel> {
    return this.http.get<PhotoModel>(API + '/photos/' + photoId);
  }

  public getComments(photoId: number): Observable<PhotoCommentModel[]> {
    return this.http.get<PhotoCommentModel[]>(
      API + '/photos/' + photoId + '/comments'
    );
  }

  public addComment(comment: AddPhotoCommentModel): Observable<any> {
    return this.http.post(API + '/photos/' + comment.photoId + '/comments', {
      commentText: comment.commentText,
    });
  }

  public removePhoto(photoId: number): Observable<any> {
    return this.http.delete(API + '/photos/' + photoId);
  }

  public like(photoId: number): Observable<boolean> {
    return this.http
      .post(API + '/photos/' + photoId + '/like', {}, { observe: 'response' })
      .pipe(map((_res) => true))
      .pipe(
        catchError((err) => {
          return err.status == '304' ? of(false) : throwError(() => err);
        })
      );
  }
}
