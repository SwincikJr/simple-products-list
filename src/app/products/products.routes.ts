import { Routes } from '@angular/router';

export const productRoutes: Routes = [
    { path: '', loadComponent: () => import('./components/products-list/products-list.component').then(m => m.ProductsListComponent) },
    { path: 'new', loadComponent: () => import('./components/products-create/products-create.component').then(m => m.ProductsCreateComponent) },
    { path: ':id', loadComponent: () => import('./components/products-view/products-view.component').then(m => m.ProductsViewComponent) }
];

export const productTypeRoutes: Routes = [
    { path: '', loadComponent: () => import('./components/product-types-list/product-types-list.component').then(m => m.ProductTypesListComponent) },
    { path: 'new', loadComponent: () => import('./components/product-types-create/product-types-create.component').then(m => m.ProductTypesCreateComponent) },
    { path: ':id', loadComponent: () => import('./components/product-types-view/product-types-view.component').then(m => m.ProductTypesViewComponent) }
];