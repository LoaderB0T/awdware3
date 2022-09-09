type Umami = {
  trackEvent: (name: string, data?: any) => void;
  trackView: (name: string, referrer?: string, website_id?: string) => void;
};

const umamiWindow = window as typeof window & { umami?: Umami };

type AwdwareAnalytics = {
  trackEvent: Umami['trackEvent'];
};

export const analytics: AwdwareAnalytics = {
  trackEvent: (name: string, data?: any) => {
    try {
      umamiWindow.umami?.trackEvent(name, data);
    } catch (error) {
      console.debug('Error while tracking event', error);
    }
  }
};
