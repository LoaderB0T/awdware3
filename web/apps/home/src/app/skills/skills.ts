type Skill = {
  name: string;
  image: string;
  link: string;
  darkLightIcon?: boolean;
};
export const skills: Skill[] = [
  {
    image: 'angular',
    name: 'Angular',
    link: 'https://angular.io/'
  },
  {
    image: 'ts',
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/'
  },
  {
    image: 'node',
    name: 'Node.js',
    link: 'https://nodejs.org/',
    darkLightIcon: true
  }
];
