import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // `/` router-redirects to `/home`. Without this the redirect is served as a 302,
    // which makes search engines index `/` as a duplicate of `/home`.
    path: '',
    renderMode: RenderMode.Server,
    status: 301,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
