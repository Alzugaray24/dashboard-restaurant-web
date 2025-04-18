import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IOrder } from '../domain/model/order.response.interface';
import { UpdateOrderService } from '../infrastructure/services/update-order/update-order.service';
import { OrderState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class UpdateOrderUseCase {
  private readonly _service = inject(UpdateOrderService);
  private readonly _state = inject(OrderState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(
    id: number,
    order: { customerId: number; dishIds: number[] }
  ): Observable<IOrder> {
    return this._service.execute(id, order).pipe(
      tap((updatedOrder: IOrder) => {
        const currentOrders = this._state.orders.orders.snapshot();
        const updatedOrders = currentOrders.map((o) =>
          o.id === updatedOrder.id ? updatedOrder : o
        );
        this._state.orders.orders.set(updatedOrders);
      })
    );
  }
}
