import { Routes } from '@angular/router';
import { ListContainerComponent } from '../containers/list-container/list-container.component';
import { CreateDishContainerComponent } from '../containers/create-container/create-container.component';

export const dishRoutes: Routes = [
  {
    path: '',
    component: ListContainerComponent,
  },
  {
    path: 'create',
    component: CreateDishContainerComponent,
  },
  {
    path: 'edit/:id',
    component: CreateDishContainerComponent,
  },
];
