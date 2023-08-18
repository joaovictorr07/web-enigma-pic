import { AbstractControl } from '@angular/forms';
import { Injectable } from "@angular/core";
import { debounceTime, map, switchMap, first } from 'rxjs';
import { HttpSignUpService } from './http-signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signUpService: HttpSignUpService) {}

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
