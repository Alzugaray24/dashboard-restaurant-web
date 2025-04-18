import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDish } from '../domain/model/dish.response.interface';
import { ListDishService } from '../infrastructure/services/list-dish/list-dish.service';
import { DishState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class ListDishesUseCase {
  private readonly _service = inject(ListDishService);
  private readonly _state = inject(DishState);
  private subscriptions: Subscription = new Subscription();

  dishes$(): Observable<IDish[]> {
    return this._state.dishes.dishes.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((dishes: IDish[]) => {
            this._state.dishes.dishes.set(dishes);
          })
        )
        .subscribe()
    );
  }
}
