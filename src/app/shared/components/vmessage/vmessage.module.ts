import { CommonModule } from '@angular/common';
import { VMessageComponent } from './vmessage.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [VMessageComponent],
  imports: [CommonModule],
  exports: [VMessageComponent]
})
export class VMessageModule {}
