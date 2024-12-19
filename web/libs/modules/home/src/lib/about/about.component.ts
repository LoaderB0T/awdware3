import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Typed } from 'typed.ts';

import { CardComponent, TranslationService } from '@awdware/shared';

import { contacts } from './contacts';
import { LogoService } from '../services/logo.service';

const typedFac = Typed.factory({
  setUp: () => signal(''),
  update: (sig, text) => sig.set(text),
});
@Component({
  imports: [TranslatePipe, CardComponent],
  selector: 'awd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private readonly _translateService: TranslateService;
  private readonly _translationService: TranslationService;
  public readonly logoService: LogoService;

  public readonly headingDone = signal(false);
  public readonly langChanged = signal(false);

  public typingHeading = typedFac({ perLetterDelay: { min: 30, max: 70 } });
  public typingDetails = typedFac({
    perLetterDelay: { min: 5, max: 20 },
    eraseDelay: { min: 40, max: 80 },
  });
  public readonly age: number;

  public contacts = contacts;

  constructor(
    translateService: TranslateService,
    translationService: TranslationService,
    logoService: LogoService
  ) {
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
      this.langChanged.set(true);
      this.headingDone.set(true);
    });
  }

  private async typeIntro(): Promise<void> {
    const thisIsMe = this._translateService.instant('about.thisIsMe');
    const overview = this._translateService.instant('about.overview', { age: this.age });
    this.typingHeading.wait(750).type('<-- ', { className: 'arrow' }); // arrow class is used in mobile view to hide the arrow
    this.typingHeading.type(thisIsMe);
    await this.typingHeading.run();
    this.headingDone.set(true);
    this.typingDetails.type('tl;dr:\n', { className: 'comment' });
    this.typingDetails.type(`\n${overview}`);
    await this.typingDetails.run();
  }
}
