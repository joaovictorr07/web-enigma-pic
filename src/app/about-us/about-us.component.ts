import { Component } from '@angular/core';

@Component({
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent {
  constructor(){}

  public openGitHub(): void {
    const gitHub = 'https://github.com/joaovictorr07';
    this.navigateToExternalPage(gitHub);
  }

  public openLinkedIn(): void {
    const linkedIn = 'https://linkedin.com/in/joão-victor-fernandes-pereira-software';
    this.navigateToExternalPage(linkedIn);
  }

  private navigateToExternalPage(url: string): void {
    window.open(url, '_blank');
  }
}
