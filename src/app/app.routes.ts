import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Users } from './features/users/pages/users-list.ts/users';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'users', component: Users },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes')
        .then((m) => m.PRODUCTS_ROUTES),
  },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes')
        .then((m) => m.DASHBOARD_ROUTES),
    canMatch: [authGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
