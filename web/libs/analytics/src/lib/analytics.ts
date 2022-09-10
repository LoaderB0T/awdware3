type Umami = {
  trackEvent: (name: string, data?: any) => void;
  trackView: (name: string, referrer?: string, website_id?: string) => void;
};

type AwdwareAnalytics = {
  trackEvent: Umami['trackEvent'];
};

const umamiWindow = window as typeof window & { umami?: Umami };

const disableAnalytics = localStorage.getItem('disableAnalytics') === 'true';

export const analytics: AwdwareAnalytics = {
  trackEvent: (name: string, data?: any) => {
    if (disableAnalytics) {
      return;
    }
    try {
      umamiWindow.umami?.trackEvent(name, data);
    } catch (error) {
      console.debug('Error while tracking event', error);
    }
  }
};
