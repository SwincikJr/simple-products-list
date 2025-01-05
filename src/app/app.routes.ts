import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'products', loadChildren: () => import('./products/products.routes').then(m => m.productRoutes) },
    { path: 'productTypes', loadChildren: () => import('./products/products.routes').then(m => m.productTypeRoutes) }
];
