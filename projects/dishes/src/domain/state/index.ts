import { inject, Injectable } from '@angular/core';
import { DishesState } from './dish.state';

@Injectable({
  providedIn: 'root',
})
export class DishState {
  private readonly _dishes = inject(DishesState);

  get dishes() {
    return this._dishes.store();
  }
}
