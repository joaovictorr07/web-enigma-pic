import { ValidatorFn, AbstractControl } from '@angular/forms';

export const ConfirmPassWordValidator: ValidatorFn = (
  formGroup: AbstractControl
) => {
  const passWord = formGroup.get('password')?.value;
  const confirmPassWord = formGroup.get('confirmPassword')?.value;
  if (passWord.trim() && confirmPassWord.trim()) {
    return passWord == confirmPassWord ? null : { confirmPassword: true };
  } else {
    return null;
  }
};
