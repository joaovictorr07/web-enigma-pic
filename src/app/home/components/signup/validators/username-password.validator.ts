import { AbstractControl, ValidatorFn } from '@angular/forms';

export const UserNamePasswordValidator: ValidatorFn = (
  formGroup: AbstractControl
) => {
  if (formGroup.get('userName') && formGroup.get('password')) {
    const userName = formGroup.get('userName')?.value;
    const password = formGroup.get('password')?.value;
    if (userName.trim() && password.trim()) {
      return userName != password ? null : { userNamePassword: true };
    } else {
      return null;
    }
  } else return null;
};
