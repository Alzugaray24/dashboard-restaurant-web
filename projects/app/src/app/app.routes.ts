import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('customers').then((m) => m.customerRoutes),
  },
  {
    path: 'dishes',
    component: MainLayoutComponent,
    loadChildren: () => import('dishes').then((m) => m.dishRoutes),
  },
  {
    path: 'menus',
    component: MainLayoutComponent,
    loadChildren: () => import('menus').then((m) => m.menuRoutes),
  },
  {
    path: 'orders',
    component: MainLayoutComponent,
    loadChildren: () => import('orders').then((m) => m.orderRoutes),
  },
];
