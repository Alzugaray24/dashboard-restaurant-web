import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IOrder } from '../domain/model/order.response.interface';
import { CreateOrderService } from '../infrastructure/services/create-order/create-order.service';
import { OrderState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderUseCase {
  private readonly _service = inject(CreateOrderService);
  private readonly _state = inject(OrderState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(order: {
    customerId: number;
    dishIds: number[];
  }): Observable<IOrder> {
    return this._service.execute(order).pipe(
      tap((newOrder: IOrder) => {
        const currentOrders = this._state.orders.orders.snapshot();
        this._state.orders.orders.set([...currentOrders, newOrder]);
      })
    );
  }
}
