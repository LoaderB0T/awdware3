import { toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTranslationService } from 'ng-dynamic-mf';
import { Subject } from 'rxjs';

const internalLenId = {
  en: '',
  de: '',
};
export declare type LenID = keyof typeof internalLenId;

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly _dynamicTranslationService = inject(DynamicTranslationService);
  private readonly _translateService = inject(TranslateService);
  private readonly _languageChanged = new Subject<LenID>();
  public readonly languageChanged$ = this._languageChanged.asObservable();
  public readonly currentLang = toSignal(this._languageChanged, {
    initialValue: this._translateService.currentLang as LenID,
  });

  public init() {
    this._translateService.setDefaultLang('en');
    this.setLanguage(this.getLanguageId());
    this._dynamicTranslationService.setTranslateService(this._translateService);
  }

  public setLanguage(lenId: LenID) {
    localStorage.setItem('language', lenId);
    document.getElementsByTagName('html')[0]?.setAttribute('lang', lenId);
    this._translateService.use(lenId);
    this._languageChanged.next(lenId);
  }

  private getLanguageId(): LenID {
    const lenId = localStorage.getItem('language');
    if (lenId && this.isSupportedLanguage(lenId)) {
      return lenId as LenID;
    } else {
      return 'en';
    }
  }

  public get lenID(): LenID {
    return this.getLanguageId();
  }

  private isSupportedLanguage(len: string): boolean {
    return Object.prototype.hasOwnProperty.call(internalLenId, len);
  }
}
