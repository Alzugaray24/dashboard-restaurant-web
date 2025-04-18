/*
 * Public API Surface of dishes
 */

export * from './infrastructure/ui/routes/dish.routes'; // export { DishComponent } from './infrastructure/ui/components/dish/dish.component';

export type { IDish } from './domain/model/dish.response.interface'; // export { DishService } from './domain/services/dish.service';

export { ListDishesUseCase } from './application/list-dish.usecase'; // export { DishState } from './domain/state';
