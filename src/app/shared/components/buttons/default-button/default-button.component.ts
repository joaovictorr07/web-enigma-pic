import { Component, Input } from '@angular/core';

@Component({
  selector: 'enigma-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
})
export class DefaultButtonComponent {
  @Input() ngButtonType: string = '';
  @Input() label: string = '';
}
