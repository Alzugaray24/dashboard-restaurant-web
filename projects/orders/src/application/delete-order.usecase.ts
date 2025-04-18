import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DeleteOrderService } from '../infrastructure/services/delete-order/delete-order.service';
import { OrderState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class DeleteOrderUseCase {
  private readonly _service = inject(DeleteOrderService);
  private readonly _state = inject(OrderState);
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
        const currentOrders = this._state.orders.orders.snapshot();
        const updatedOrders = currentOrders.filter((order) => order.id !== id);
        this._state.orders.orders.set(updatedOrders);
      })
    );
  }
}
