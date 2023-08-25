import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultButtonComponent } from './default-button.component';

@NgModule({
  declarations: [DefaultButtonComponent],
  imports: [CommonModule],
  exports: [DefaultButtonComponent],
})
export class DefaultButtonModule {}
