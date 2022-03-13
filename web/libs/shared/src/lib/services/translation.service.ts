import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTranslationService } from 'ng-dynamic-mf';

const internalLenId = {
  en: '',
  de: ''
};
export declare type LenID = keyof typeof internalLenId;

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly _dynamicTranslationService: DynamicTranslationService;
  private readonly _translateService: TranslateService;

  constructor(translateService: TranslateService, dynamicTranslationService: DynamicTranslationService) {
    this._dynamicTranslationService = dynamicTranslationService;
    this._translateService = translateService;
  }

  public init() {
    this._translateService.setDefaultLang('en');
    this.setLanguage(this.getLanguageId());
    this._dynamicTranslationService.setTranslateService(this._translateService);
  }

  public setLanguage(lenId: LenID) {
    localStorage.setItem('language', lenId);
    this._translateService.use(lenId);
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
