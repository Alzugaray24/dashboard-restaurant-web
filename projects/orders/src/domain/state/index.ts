import { inject, Injectable } from '@angular/core';
import { OrdersState } from './order.state';

@Injectable({
  providedIn: 'root',
})
export class OrderState {
  private readonly _orders = inject(OrdersState);

  get orders() {
    return this._orders.store();
  }
}
