import { AddHtmlHeadElementType } from 'ng-dynamic-mf';
import { environment } from 'ng-dynamic-mf/environment';

export const font_montserrat: AddHtmlHeadElementType = {
  type: 'link',
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
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

export const analyticsReplay: AddHtmlHeadElementType = {
  type: 'script',
  data: {
    'website-id': environment['analyticsId'],
    'sample-rate': '1',
    'mask-level': 'moderate',
    'max-duration': '300000',
  },
  src: `https://analytics.${environment['appUrl']}/recorder.js`,
};
