import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from '@awdware/shared';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Typed } from 'rxjs-typed.ts';
import { LogoService } from '../services/logo.service';
import { contacts } from './contacts';

@Component({
  selector: 'awd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  private readonly _translateService: TranslateService;
  private readonly _translationService: TranslationService;
  public readonly logoService: LogoService;

  private readonly _headingDone = new BehaviorSubject(false);
  public readonly headingDone$ = this._headingDone.asObservable();
  private readonly _langChanged = new BehaviorSubject(false);
  public readonly langChanged$ = this._langChanged.asObservable();

  public typingHeading = new Typed({ perLetterDelay: { min: 30, max: 70 } });
  public typingDetails = new Typed({ perLetterDelay: { min: 5, max: 20 }, eraseDelay: { min: 40, max: 80 } });
  public readonly age: number;

  public contacts = contacts;

  constructor(translateService: TranslateService, translationService: TranslationService, logoService: LogoService) {
    this._translateService = translateService;
    this._translationService = translationService;
    this.logoService = logoService;

    const today = new Date();
    const birthday = new Date('1999-06-09');
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    this.age = age;
  }

  public ngOnInit() {
    this.typeIntro();
    this._translationService.languageChanged$.subscribe(() => {
      this._langChanged.next(true);
      this._headingDone.next(true);
    });
  }

  private async typeIntro(): Promise<void> {
    const thisIsMe = this._translateService.instant('about.thisIsMe');
    const overview = this._translateService.instant('about.overview', { age: this.age });
    this.typingHeading.wait(750).type('<-- ', { className: 'arrow' });
    this.typingHeading.type(thisIsMe);
    await this.typingHeading.run();
    this._headingDone.next(true);
    this.typingDetails.type('tl;dr:\n', { className: 'comment' });
    this.typingDetails.type(`\n${overview}`);
    await this.typingDetails.run();
  }
}
