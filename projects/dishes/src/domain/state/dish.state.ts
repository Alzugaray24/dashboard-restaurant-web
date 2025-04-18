import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IDish } from '../model/dish.response.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishesState {
  private readonly _factory = inject(StateFactory);
  private readonly dishes$ = new BehaviorSubject<IDish[]>([]);

  store() {
    return {
      dishes: this._factory.state(this.dishes$),
    };
  }
}
