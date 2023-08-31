import { NgModule } from '@angular/core';
import { AboutUsComponent } from './about-us.component';
import { CommonModule } from '@angular/common';
import { HoverButtonModule } from '../shared/components/buttons/hover-button/hover-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, HoverButtonModule, RouterModule],
  exports: [AboutUsComponent],
})
export class AboutUsModule {}
