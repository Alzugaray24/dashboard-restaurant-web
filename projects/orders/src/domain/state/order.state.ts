import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IOrder } from '../model/order.response.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersState {
  private readonly _factory = inject(StateFactory);
  private readonly orders$ = new BehaviorSubject<IOrder[]>([]);

  store() {
    return {
      orders: this._factory.state(this.orders$),
    };
  }
}
