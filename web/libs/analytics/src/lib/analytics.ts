import { environment } from 'ng-dynamic-mf';

type TrackType = (() => void) | ((eventName: string, data?: any) => void);

type Umami = {
  track: TrackType;
};

const umamiWindow = window as typeof window & { umami?: Umami };

export const disableAnalytics = localStorage.getItem('disableAnalytics') === 'true' || environment['appUrl'] === 'localhost';

export const analytics: Umami = {
  track: (name: string, data?: object) => {
    if (disableAnalytics) {
      return;
    }
    try {
      umamiWindow.umami?.track(name, data);
    } catch (error) {
      console.debug('Error while tracking event', error);
    }
  }
};
