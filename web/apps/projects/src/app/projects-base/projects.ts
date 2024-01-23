export type Project = {
  name: string;
  descriptions: {
    [lang: string]: string | undefined;
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
        'It is built using Angular and Module Federation.',
      de:
        'awdware3 ist die aktuelle Version dieser Website. ' +
        'Es ist die dritte Iteration der awdware Website, ' +
        'welche mit Angular und Module Federation gebaut ist.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'awesome-logging',
    descriptions: {
      en:
        'awesome-logging is a logging and prompting library for CLI applications written in NodeJS. ' +
        'It is written in TypeScript and provides a strongly-typed, simple, yet powerful API.',
      de:
        'awesome-logging ist eine Logging- und Prompting-Library für CLI-Anwendungen, welche in NodeJS geschrieben sind. ' +
        'Es ist in TypeScript geschrieben und bietet eine strikt typisierte, einfache, aber leistungsstarke API.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'ng-dynamic-mf',
    descriptions: {
      en:
        'ng-dynamic-mf is a helper library for Module Federation in Angular. ' +
        'It makes loading modules fully dynamic at runtime, helps with asset resolution, translations and routing across apps.',
      de:
        'ng-dynamic-mf ist eine Hilfsbibliothek für Module Federation in Angular. ' +
        'Es ermöglicht das dynamische Laden von Modulen zur Laufzeit, hilft bei der Auflösung von Assets, Übersetzungen und Routing zwischen Apps.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'paint-increment',
    descriptions: {
      en:
        'paint-increment is a fun project to collaboatively and iteratively paint on a shared canvas. ' +
        'The idea is to create a shirt with friends that has the final painting and all iterations printed on it.',
      de:
        'paint-increment ist ein Spaßprojekt, um gemeinsam und iterativ auf einer gemeinsamen Leinwand zu malen. ' +
        'Die Idee ist es, ein T-Shirt mit Freunden zu erstellen, welches das fertige Bild und alle Iterationen darauf gedruckt hat.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'typed.ts',
    descriptions: {
      en:
        'typed.ts is a small library for creating realistic typing animations in TypeScript or JavaScript. ' +
        'The library is configurable in many ways and will randomly type errors and correct them automatically.',
      de:
        'typed.ts ist eine kleine Bibliothek für die Erstellung realistischer Tipp-Animationen in TypeScript oder JavaScript. ' +
        'Die Bibliothek ist in vielen Bereichen konfigurierbar und wird zufällig Fehler tippen und diese automatisch korrigieren.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'easy-network-stub',
    descriptions: {
      en:
        'easy-network-stub provides an easy-to-use and type-safe network stub API for NodeJS based e2e testing frameworks. ' +
        'It is meant for test scenarios where you want to mock each and every request to a remote API.',
      de:
        'easy-network-stub bietet eine einfach zu bedienende und typsichere Netzwerk-Stub-API für NodeJS-basierte E2E-Testframeworks. ' +
        'Es ist für Testszenarien gedacht, bei denen Sie jede einzelne Anfrage an eine Remote-API simulieren möchten.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'confetti.ts',
    descriptions: {
      en:
        'confetti.ts is a library for creating particle animations in TypeScript or JavaScript in a HTML canvas. ' +
        'It is lightweight, has a simple API and is extensible with custom particle types.',
      de:
        'confetti.ts ist eine Bibliothek für die Erstellung von Partikel-Animationen in TypeScript oder JavaScript in einem HTML Canvas. ' +
        'Die Bibliothek ist leichtgewichtig, hat eine einfache API und ist erweiterbar mit benutzerdefinierten Partikeltypen.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'node-terminal-simulator',
    descriptions: {
      en:
        'node-terminal-simulator simulates the bahavior of the terminal, including many ANSI escape codes. ' +
        "It's primary use case is to test CLI applications that rely on ANSI escapes to do terminal magic.",
      de:
        'node-terminal-simulator simuliert das Verhalten des Terminals, einschließlich vieler ANSI Escape-Codes. ' +
        'Das primäre Anwendungsgebiet ist das Testen von CLI-Anwendungen, die auf ANSI Escapes angewiesen sind, um Magie im Terminal zu machen.',
    },
    gitHubUser: 'LoaderB0T',
  },
  {
    name: 'Bl3-EchoCom',
    descriptions: {
      en:
        'This repo contains all required resources to 3D print and build your own Echo Device from the Borderlands franchise. ' +
        'You can find the STL files for 3D printing, the KiCad project for the custom PCB and some example code.',
      de:
        'Dieses Repo enthält alle benötigten Ressourcen, um Ihr eigenes Echo Device aus dem Borderlands-Franchise zu 3D drucken und zu bauen. ' +
        'Sie finden die STL-Dateien zum 3D-Drucken, das KiCad-Projekt für das PCB und etwas Beispielcode.',
    },
    gitHubUser: 'LoaderB0T',
  },
];
