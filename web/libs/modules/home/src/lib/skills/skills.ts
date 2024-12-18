type Skill = {
  name: string;
  image: string;
  link: string;
  imageFilename?: string;
  darkLightIcon?: boolean;
};
export const skills: Skill[] = [
  {
    image: 'angular',
    name: 'Angular',
    imageFilename: 'logo_angular.gif',
    link: 'https://angular.io/',
  },
  {
    image: 'ts',
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
  },
  {
    image: 'node',
    name: 'Node.js',
    link: 'https://nodejs.org/',
    darkLightIcon: true,
  },
];
