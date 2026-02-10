import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Users } from './features/users/users';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'users', component: Users },

  { path: 'login', component: Login },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
];
