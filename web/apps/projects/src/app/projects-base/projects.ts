export type Project = {
  name: string;
  descriptions: {
    [lang: string]: string;
  };
  gitHubUser: string;
};

export const projects: Project[] = [
  {
    name: 'awdware3',
    descriptions: {
      en:
        'awdware3 is this very website you are looking at right now. ' +
        'It is the third iteration of the awdware website. ' +
        'It is built using Angular and Module Federation.'
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'awesome-logging',
    descriptions: {
      en:
        'awesome-logging is a logging and prompting library for CLI applications written in NodeJS. ' +
        'It is written in TypeScript and provides a strongly-typed, simple, yet powerful API.'
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'ng-dynamic-mf',
    descriptions: {
      en:
        'ng-dynamic-mf is a helper library for Module Federation in Angular. ' +
        'It makes loading modules fully dynamic at runtime, helps with asset resolution, translations and routing across apps.'
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'paint-increment',
    descriptions: {
      en:
        'paint-increment is a fun project to collaboatively and iteratively paint on a shared canvas. ' +
        'The idea is to create a shirt with friends that has the final painting and all iterations printed on it.'
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'typed.ts',
    descriptions: {
      en:
        'typed.ts is a small library for creating realistic typing animations in TypeScript or JavaScript. ' +
        'The library is configurable in many ways and will randomly type errors and correct them automatically.'
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'easy-network-stub',
    descriptions: {
      en:
        'easy-network-stub provides an easy-to-use and type-safe network stub API for NodeJS based e2e testing frameworks. ' +
        'It is meant for test scenarios where you want to mock each and every request to a remote API.'
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'confetti.ts',
    descriptions: {
      en:
        'confetti.ts is a library for creating particle animations in TypeScript or JavaScript in a HTML canvas. ' +
        'It is lightweight, has a simple API and is extensible with custom particle types.'
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'node-terminal-simulator',
    descriptions: {
      en:
        'node-terminal-simulator simulates the bahavior of the terminal, including many ANSI escape codes. ' +
        "It's primary use case is to test CLI applications that rely on ANSI escapes to do terminal magic."
    },
    gitHubUser: 'LoaderB0T'
  },
  {
    name: 'Bl3-EchoCom',
    descriptions: {
      en:
        'This repo contains all required resources to 3D print and build your own Echo Device from the Borderlands franchise. ' +
        'You can find the STL files for 3D printing, the KiCad project for the custom PCB and some example code.'
    },
    gitHubUser: 'LoaderB0T'
  }
];
