import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[showIfLogged]',
})
export class ShowIfLoggedDirective implements OnInit, OnDestroy {
  currentDisplay!: string;
  private subcription!: Subscription;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
    this.subcription = this.userService
      .getUser()
      .pipe(
        tap((user) => {
          if (user) {
            this.renderer.setStyle(
              this.element.nativeElement,
              'display',
              this.currentDisplay
            );
          } else {
            this.currentDisplay = getComputedStyle(
              this.element.nativeElement
            ).display;
            this.renderer.setStyle(
              this.element.nativeElement,
              'display',
              'none'
            );
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
