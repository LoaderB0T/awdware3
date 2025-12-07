
import { inject, Injectable, DOCUMENT } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IsProdService {
  private readonly _window = inject(DOCUMENT).defaultView;
  public readonly isProd = this._window?.location.hostname === 'awdware.de';
}
