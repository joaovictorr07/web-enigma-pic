import { AbstractControl } from '@angular/forms';
import { Injectable } from "@angular/core";
import { debounceTime, map, switchMap, first } from 'rxjs';
import { SignUpService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signUpService: SignUpService) {}

  checkUserNameTaken(){


    return (control: AbstractControl) => {
      return control
            .valueChanges
            .pipe(debounceTime(300))
            .pipe(switchMap(userName =>
               this.signUpService.checkUserNameTaken(userName)
            ))
            .pipe(map(isTaken => isTaken ? {userNameTaken: true} : null))
            .pipe(first());
    }
  }
}
