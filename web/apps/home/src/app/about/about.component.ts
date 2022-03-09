import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Typed } from 'rxjs-typed.ts';

@Component({
  selector: 'awd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  private readonly _translateService: TranslateService;
  private readonly _headingDone = new BehaviorSubject<boolean>(false);
  public readonly headingDone$ = this._headingDone.asObservable();

  public typingHeading = new Typed({ minDelay: 30, maxDelay: 70 });
  public typingDetails = new Typed({ minDelay: 20, maxDelay: 40, minEraseDelay: 20, maxEraseDelay: 40 });

  constructor(translateService: TranslateService) {
    this._translateService = translateService;
  }

  ngOnInit() {
    this.typeIntro();
  }

  private async typeIntro(): Promise<void> {
    const today = new Date();
    const birthday = new Date('1999-06-09');
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    const thisIsMe = this._translateService.instant('about.thisIsMe');
    const overview = this._translateService.instant('about.overview', { age });
    await this.typingHeading.start(thisIsMe);
    this._headingDone.next(true);
    await this.typingDetails.start(overview);
  }
}
