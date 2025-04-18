import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DeleteDishService } from '../infrastructure/services/delete-dish/delete-dish.service';
import { DishState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class DeleteDishUseCase {
  private readonly _service = inject(DeleteDishService);
  private readonly _state = inject(DishState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): Observable<void> {
    return this._service.execute(id).pipe(
      tap(() => {
        const currentDishes = this._state.dishes.dishes.snapshot();
        const updatedDishes = currentDishes.filter((dish) => dish.id !== id);
        this._state.dishes.dishes.set(updatedDishes);
      })
    );
  }
}
