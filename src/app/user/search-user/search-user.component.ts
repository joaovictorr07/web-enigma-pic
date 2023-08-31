import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, debounce, debounceTime, tap } from 'rxjs';
import { UserModel } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'enigma-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnDestroy {
  listUsers$: Observable<UserModel[]>;
  formGroup!: FormGroup;
  listUsers: UserModel[] = [];
  private subscription!: Subscription;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.listUsers$ = this.userService.getListUsers();
    this.buildFormGroup();
    this.initListner();
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      searchInput: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  private initListner(): void {
    this.subscription = this.listUsers$.pipe(
      tap((users) => {
          this.listUsers = users;
      })
    ).subscribe();
  }

  public search(): void {
    this.formGroup.controls['searchInput'].valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      (value) => {
        if(value) {
          this.userService.searchByUserName(value);
        } else {
          this.listUsers = [];
        }
      }
    )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
