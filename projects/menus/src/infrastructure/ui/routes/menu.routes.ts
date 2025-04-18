import { Routes } from '@angular/router';
import { ListContainerComponent } from '../containers/list-container/list-container.component';
import { CreateContainerComponent } from '../containers/create-container/create-container.component';
import { UpdateContainerComponent } from '../containers/update-container/update-container.component';

export const menuRoutes: Routes = [
  {
    path: '',
    component: ListContainerComponent,
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
