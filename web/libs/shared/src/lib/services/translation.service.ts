import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTranslationService } from 'ng-dynamic-mf';
import { Subject } from 'rxjs';

const internalLangId = {
  en: '',
  de: '',
};
export declare type LangId = keyof typeof internalLangId;

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly _dynamicTranslationService = inject(DynamicTranslationService);
  private readonly _translateService = inject(TranslateService);
  private readonly _languageChanged = new Subject<LangId>();
  public readonly languageChanged$ = this._languageChanged.asObservable();
  public readonly currentLang = toSignal(this._languageChanged, {
    initialValue: this._translateService.currentLang as LangId,
  });

  public init() {
    this._translateService.setDefaultLang('en');
    this.setLanguage(this.getLanguageId());
    this._dynamicTranslationService.setTranslateService(this._translateService);
  }

  public setLanguage(langId: LangId) {
    localStorage.setItem('language', langId);
    document.getElementsByTagName('html')[0]?.setAttribute('lang', langId);
    this._translateService.use(langId);
    this._languageChanged.next(langId);
  }

  private getLanguageId(): LangId {
    const langId = localStorage.getItem('language');
    if (langId && this.isSupportedLanguage(langId)) {
      return langId as LangId;
    } else {
      return 'en';
    }
  }

  public get langId(): LangId {
    return this.getLanguageId();
  }

  private isSupportedLanguage(lang: string): boolean {
    return Object.prototype.hasOwnProperty.call(internalLangId, lang);
  }
}
