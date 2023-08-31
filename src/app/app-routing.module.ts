import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { LoginGuard } from './core/auth/login.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/components/home/home.component';
import { PhotoDetailComponent } from './photos/photo-detail/photo-detail.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/components/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/resolvers/photo-list.resolver';
import { SearchUserComponent } from './user/search-user/search-user.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'user/search',
    component: SearchUserComponent,
    loadChildren: () => import('./user/search-user/search-user.module').then((m) => m.SearchUserModule)
  },

  {
    path: 'user/:userName',
    component: PhotoListComponent,
    resolve: { photos: PhotoListResolver },
    data: {
      title: 'GngPic - Linha do tempo',
    },
  },
  {
    path: 'p/add',
    component: PhotoFormComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'GngPic - Upload',
    },
  },
  {
    path: 'p/:photoId',
    component: PhotoDetailComponent,
    data: {
      title: 'GngPic - Detalhe da foto',
    },
  },

  {
    path: 'about-us',
    component: AboutUsComponent,
    loadChildren: () => import('./about-us/about-us.module').then((m) => m.AboutUsModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Página não encontrada',
    },
  },
  {
    path: 'error',
    component: GlobalErrorComponent,
    data: {
      title: 'Erro',
    },
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
