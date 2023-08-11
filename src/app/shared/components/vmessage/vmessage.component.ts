import { Component, Input } from "@angular/core";

@Component({
  selector: 'enigma-vmessage',
  templateUrl: './vmessage.component.html'
})
export class VMessageComponent {

  @Input()text = '';
}
