import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'enigma-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  user$!: Observable<UserModel | null>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
  }
}
