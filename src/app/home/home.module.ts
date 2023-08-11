import { HomeComponent } from './home.component';
import { SignUpComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigInComponent } from './sigin/sigin.component';
import { NgModule } from "@angular/core";
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './signup/signup.service';

@NgModule({
  declarations: [SigInComponent, SignUpComponent, HomeComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    VMessageModule,
    RouterModule,
    FormsModule,
    HomeRoutingModule
  ],
  providers: [
    SignUpService
  ]
})
export class HomeModule {}
