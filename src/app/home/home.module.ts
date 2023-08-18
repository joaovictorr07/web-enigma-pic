import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SigInComponent } from './sigin/sigin.component';
import { SiginService } from './sigin/services/sigin.service';
import { HttpSignUpService } from './signup/services/http-signup.service';
import { SignUpComponent } from './signup/signup.component';
import { SignupService } from './signup/services/signup.service';

@NgModule({
  declarations: [SigInComponent, SignUpComponent, HomeComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    VMessageModule,
    RouterModule,
    FormsModule,
    HomeRoutingModule,
  ],
  providers: [SiginService, SignupService, HttpSignUpService],
})
export class HomeModule {}
