import { Routes } from '@angular/router';
import { Products } from './products';
import { ProductsFacade } from './data-access/products.facade';
import { ProductsStore } from './data-access/products.store';
import { ProductsApi } from './data-access/products.api';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: Products,
    providers: [
      ProductsStore, 
      ProductsApi,
      ProductsFacade,
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/products-list.page')
            .then((m) => m.ProductsListPage),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./pages/product-edit.page')
            .then((m) => m.ProductEditPage),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/product-details.page')
            .then((m) => m.ProductDetailsPage),
      },
    ],
  },
];
