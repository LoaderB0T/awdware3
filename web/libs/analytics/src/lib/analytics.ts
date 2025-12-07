import { inject, Injectable, DOCUMENT } from '@angular/core';
import { environment } from 'ng-dynamic-mf/environment';

type TrackType = (() => void) | ((eventName: string, data?: any) => void);

type Umami = {
  track: TrackType;
};

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly _window = inject(DOCUMENT).defaultView;

  private readonly _umamiWindow = this._window as (typeof window & { umami?: Umami }) | null;

  public readonly disableAnalytics =
    this._umamiWindow?.localStorage?.getItem('disableAnalytics') === 'true' ||
    environment['appUrl'] === 'localhost';

  public readonly analytics: Umami = {
    track: (name: string, data?: object) => {
      if (this.disableAnalytics) {
        return;
      }
      try {
        this._umamiWindow?.umami?.track(name, data);
      } catch (error) {
        console.debug('Error while tracking event', error);
      }
    },
  };
}
