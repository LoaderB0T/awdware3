
import { Injectable, inject, DOCUMENT } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { StorageService } from './storage.service';

const internalLangId = {
  en: '',
  de: '',
};
export declare type LangId = keyof typeof internalLangId;

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly _translateService = inject(TranslateService);
  private readonly _storage = inject(StorageService).init('language', 'en');
  private readonly _document = inject(DOCUMENT);
  private readonly _languageChanged = new Subject<LangId>();
  public readonly languageChanged$ = this._languageChanged.asObservable();
  public readonly currentLang = toSignal(this._languageChanged, {
    initialValue: this._translateService.currentLang as LangId,
  });

  public init() {
    this._translateService.setDefaultLang('en');
    this.setLanguage(this.getLanguageId());
  }

  public setLanguage(langId: LangId) {
    this._storage.value = langId;
    this._document.getElementsByTagName('html')[0]?.setAttribute('lang', langId);
    this._translateService.use(langId);
    this._languageChanged.next(langId);
  }

  private getLanguageId(): LangId {
    const langId = this._storage.value;
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
