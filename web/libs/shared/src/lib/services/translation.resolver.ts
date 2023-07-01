import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTranslationService } from 'ng-dynamic-mf';

export const translationResolver: ResolveFn<void> = (route: ActivatedRouteSnapshot) => {
  const moduleName = route.data['module'];
  if (!moduleName) {
    throw new Error('Module name is not defined in route data');
  }

  const dynamicTranslationService = inject(DynamicTranslationService);
  const translateService = inject(TranslateService);
  dynamicTranslationService.setTranslateService(translateService);
  return dynamicTranslationService.registerTranslations(['de', 'en'], l => `assets/locales/${l}.json`, moduleName);
};
