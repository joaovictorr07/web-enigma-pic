import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseValidationService } from '../../services/base-validation.service';
import { VMessageComponent } from './vmessage.component';

@NgModule({
  declarations: [VMessageComponent],
  imports: [CommonModule],
  exports: [VMessageComponent],
  providers: [BaseValidationService],
})
export class VMessageModule {}
