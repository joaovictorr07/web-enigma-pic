import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { BaseValidationService } from '../../services/base-validation.service';

@Component({
  selector: 'enigma-vmessage',
  templateUrl: './vmessage.component.html',
})
export class VMessageComponent {
  @Input() control: AbstractControl | null = null;
  @Input() visible: boolean = false;
  @Input() formGroup: FormGroup | null = null;

  constructor(private baseValidacaoService: BaseValidationService) {}

  get errorMessage() {
    if (this.control != null) {
      for (let propertyName in this.control.errors) {
        let retorno: any = this.control;

        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          (retorno._pendingDirty == true ||
            this.control.touched ||
            this.visible)
        ) {
          let messsagedefault =
            this.baseValidacaoService.getValidatorErrorMessageDefault(
              propertyName
            );

          if (messsagedefault != undefined) {
            return messsagedefault;
          } else {
            return propertyName;
          }
        }
      }
    }
    return null;
  }
}
