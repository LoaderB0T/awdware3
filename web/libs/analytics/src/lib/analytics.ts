type Umami = {
  trackEvent: (name: string, data?: object) => void;
  trackView: (name: string) => void;
};

const umamiWindow = window as typeof window & { umami?: Umami };

export const disableAnalytics = localStorage.getItem('disableAnalytics') === 'true';

export const analytics: Umami = {
  trackEvent: (name: string, data?: object) => {
    if (disableAnalytics) {
      return;
    }
    try {
      umamiWindow.umami?.trackEvent(name, data);
    } catch (error) {
      console.debug('Error while tracking event', error);
    }
  },
  trackView: (name: string) => {
    if (disableAnalytics) {
      return;
    }
    try {
      umamiWindow.umami?.trackView(name);
    } catch (error) {
      console.debug('Error while tracking view', error);
    }
  }
};
