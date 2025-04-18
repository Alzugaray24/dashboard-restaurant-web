import { Routes } from '@angular/router';
import { ListCustomersContainer } from '../containers/list-container/list-container';
import { CreateContainerComponent } from '../containers/create-container/create-container';
import { UpdateContainerComponent } from '../containers/update-container/update-container.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: ListCustomersContainer,
  },
  {
    path: 'create',
    component: CreateContainerComponent,
  },
  {
    path: 'edit/:id',
    component: UpdateContainerComponent,
  },
];
