import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent) },
    { path: 'products', loadChildren: () => import('./products/products.routes').then(m => m.productRoutes) },
    { path: 'productTypes', loadChildren: () => import('./products/products.routes').then(m => m.productTypeRoutes) }
];
