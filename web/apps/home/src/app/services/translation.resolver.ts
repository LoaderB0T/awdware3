import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTranslationService } from 'ng-dynamic-mf';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationResolver implements Resolve<void> {
  private readonly _translateService: TranslateService;
  private readonly _dynamicTranslationService: DynamicTranslationService;

  constructor(translateService: TranslateService, dynamicTranslationService: DynamicTranslationService) {
    this._translateService = translateService;
    this._dynamicTranslationService = dynamicTranslationService;
  }

  resolve(): Observable<void> | Promise<void> | void {
    this._dynamicTranslationService.setTranslateService(this._translateService);
    return this._dynamicTranslationService.registerTranslations(['de', 'en'], l => `assets/locales/${l}.json`, 'home');
  }
}
