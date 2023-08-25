import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DefaultButtonModule } from '../shared/components/buttons/default-button/default-button.module';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeComponent } from './components/home/home.component';
import { SiginService } from './components/sigin/services/sigin.service';
import { SigInComponent } from './components/sigin/sigin.component';
import { HttpSignUpService } from './components/signup/services/http-signup.service';
import { SignupService } from './components/signup/services/signup.service';
import { SignUpComponent } from './components/signup/signup.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  declarations: [SigInComponent, SignUpComponent, HomeComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    VMessageModule,
    RouterModule,
    FormsModule,
    HomeRoutingModule,
    DefaultButtonModule,
  ],
  providers: [SiginService, SignupService, HttpSignUpService],
})
export class HomeModule {}
