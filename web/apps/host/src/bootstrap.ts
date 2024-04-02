import { doBootstrap } from '@awdware/bootstrap';

doBootstrap(() => import('./app/app.module').then(m => m.AppModule), true);
