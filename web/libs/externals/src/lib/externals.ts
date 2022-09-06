import { AddHtmlHeadElementType } from 'ng-dynamic-mf';

export const font_montserrat: AddHtmlHeadElementType = {
  type: 'link',
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700'
};

export const fontawesome: AddHtmlHeadElementType = {
  type: 'script',
  src: 'https://kit.fontawesome.com/8552b95824.js',
  crossorigin: 'anonymous'
};

export const devicons: AddHtmlHeadElementType = {
  type: 'link',
  rel: 'stylesheet',
  href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css'
};
