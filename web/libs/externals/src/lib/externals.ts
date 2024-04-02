import { AddHtmlHeadElementType } from 'ng-dynamic-mf';
import { environment } from 'ng-dynamic-mf/environment';

export const font_montserrat: AddHtmlHeadElementType = {
  type: 'link',
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
};

export const fontawesome: AddHtmlHeadElementType = {
  type: 'script',
  src: 'https://kit.fontawesome.com/8552b95824.js',
  crossorigin: 'anonymous',
};

export const devicons: AddHtmlHeadElementType = {
  type: 'link',
  rel: 'stylesheet',
  href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css',
};

export const analytics: AddHtmlHeadElementType = {
  type: 'script',
  data: {
    'website-id': environment['analyticsId'],
  },
  src: `https://analytics.${environment['appUrl']}/script.js`,
};
