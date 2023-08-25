import { Component, Input } from '@angular/core';

@Component({
  selector: 'enigma-load-button',
  templateUrl: './load-button.component.html',
})
export class LoadButtonComponent {
  @Input() hasMore: boolean = false;
  constructor() {}
}
