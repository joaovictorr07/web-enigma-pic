import { DarkOnHoverDirective } from './dark-on-hover.directive';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [DarkOnHoverDirective],
  exports: [DarkOnHoverDirective]
})
export class DarkOnHoverModule {}
