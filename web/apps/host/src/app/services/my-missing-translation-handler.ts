import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MyMissingTranslationHandler extends MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    console.error('Missing translation:', params.key);
    return `### ${params.key} ###`;
  }
}
