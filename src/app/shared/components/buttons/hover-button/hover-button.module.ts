import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HoverButtonComponent } from './hover-button.component';

@NgModule({
  declarations: [HoverButtonComponent],
  imports: [CommonModule],
  exports: [HoverButtonComponent],
})
export class HoverButtonModule {}
