import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Observable, Subscription, switchMap, tap } from 'rxjs';
import { UserModel } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';

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
      searchInput: [null],
    });
  }

  private initListner(): void {
    this.subscription = this.listUsers$
      .pipe(
        tap((users) => {
          this.listUsers = users;
        })
      )
      .subscribe();
  }

  public search(): void {
    this.formGroup.controls['searchInput'].valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          if (value) {
            this.userService.searchByUserName(value);
          } else {
            this.listUsers = [];
          }
          return [];
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
