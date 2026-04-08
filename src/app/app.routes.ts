import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'workout',
    loadComponent: () => import('./workout/workout.page').then( m => m.WorkoutPage)
  },
  {
    path: 'log',
    loadComponent: () => import('./log/log.page').then( m => m.LogPage)
  },
];
