import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDish } from '../domain/model/dish.response.interface';
import { CreateDishService } from '../infrastructure/services/create-dish/create-dish.service';
import { DishState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class CreateDishUseCase {
  private readonly _service = inject(CreateDishService);
  private readonly _state = inject(DishState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dish: Partial<IDish>): Observable<IDish> {
    return this._service.execute(dish).pipe(
      tap((newDish: IDish) => {
        const currentDishes = this._state.dishes.dishes.snapshot();
        this._state.dishes.dishes.set([...currentDishes, newDish]);
      })
    );
  }
}
