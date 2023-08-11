import { Component } from '@angular/core';

@Component({
  selector: 'enigma-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  isShown = false;

  public toggle(): void {
    this.isShown = !this.isShown;
  }
}
