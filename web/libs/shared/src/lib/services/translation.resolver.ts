import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTranslationService } from 'ng-dynamic-mf';

@Injectable({ providedIn: 'root' })
export class TranslationResolver implements Resolve<void> {
  private readonly _translateService: TranslateService;
  private readonly _dynamicTranslationService: DynamicTranslationService;

  constructor(translateService: TranslateService, dynamicTranslationService: DynamicTranslationService) {
    this._translateService = translateService;
    this._dynamicTranslationService = dynamicTranslationService;
  }

  public resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const moduleName = route.data['module'];
    if (!moduleName) {
      throw new Error('Module name is not defined in route data');
    }
    this._dynamicTranslationService.setTranslateService(this._translateService);
    return this._dynamicTranslationService.registerTranslations(['de', 'en'], l => `assets/locales/${l}.json`, moduleName);
  }
}
