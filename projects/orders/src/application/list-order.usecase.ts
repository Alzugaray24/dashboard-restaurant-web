import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IOrder } from '../domain/model/order.response.interface';
import { ListOrderService } from '../infrastructure/services/list-order/list-order.service';
import { OrderState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class ListOrdersUseCase {
  private readonly _service = inject(ListOrderService);
  private readonly _state = inject(OrderState);
  private subscriptions: Subscription = new Subscription();

  orders$(): Observable<IOrder[]> {
    return this._state.orders.orders.$();
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
          tap((orders: IOrder[]) => {
            this._state.orders.orders.set(orders);
          })
        )
        .subscribe()
    );
  }
}
