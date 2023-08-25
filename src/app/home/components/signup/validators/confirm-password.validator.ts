import { AbstractControl, ValidatorFn } from '@angular/forms';

export const ConfirmPassWordValidator: ValidatorFn = (
  formGroup: AbstractControl
) => {
  if (formGroup.get('password') && formGroup.get('confirmPassword')) {
    const passWord = formGroup.get('password')?.value;
    const confirmPassWord = formGroup.get('confirmPassword')?.value;
    if (passWord.trim() && confirmPassWord.trim()) {
      return passWord == confirmPassWord ? null : { confirmPassword: true };
    } else {
      return null;
    }
  } else return null;
};
