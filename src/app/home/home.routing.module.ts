import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigInComponent } from './sigin/sigin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: SigInComponent,
    data: {
      title: 'GngPic - Login',
    },
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: {
      title: 'GngPic - Novo Registro',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
