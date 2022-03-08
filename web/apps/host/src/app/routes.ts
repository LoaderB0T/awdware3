import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '#module-entry-point#',
        redirectTo: '/'
      }
    ]
  }
];
