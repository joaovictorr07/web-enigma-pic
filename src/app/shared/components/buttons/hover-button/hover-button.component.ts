import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'enigma-hover-button',
  templateUrl: './hover-button.component.html',
  styleUrls: ['./hover-button.component.css'],
})
export class HoverButtonComponent {
  @Input() label!: string;
  @Input() ngButtonType: string | null = null;
  @Input() fontAwesomeIcon!: string;
  @Input() ngButtonClass!: string;
  @Input() disabled = false;
  @Output() onClickEvent = new EventEmitter<boolean>();

  public clickButton(): void {
    this.onClickEvent.emit(true);
  }
}
