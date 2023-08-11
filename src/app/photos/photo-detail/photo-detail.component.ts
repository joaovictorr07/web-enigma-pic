import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { PhotoModel } from '../photo/models/photo.model';
import { PhotoService } from '../photo/photo.service';
import { ToastNotificationService } from 'src/app/shared/components/toast-notification/toast-notification.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit {
  photo$!: Observable<PhotoModel>;
  photoId!: number;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private messageService: ToastNotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params['photoId'];
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe({
      error: () => {
        this.router.navigate(['not-found']);
      },
    });
  }

  public removePhoto(): void {
    this.photoService.removePhoto(this.photoId).subscribe({
      complete: () => {
        this.messageService.sucess('Foto excluída com sucesso');
        this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true});
      },
      error: (err) => {
        console.log(err);
        this.messageService.warning('Erro na exclusão da foto');
      },
    });
  }

  public like(photo: PhotoModel): void {
    this.photoService
      .like(photo.id)
      .pipe(
        map((res) => {
          if (res) {
            this.photo$ = this.photoService.findById(photo.id);
          }
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.messageService.warning('Erro ao curtir a foto');
        },
      });
  }
}
