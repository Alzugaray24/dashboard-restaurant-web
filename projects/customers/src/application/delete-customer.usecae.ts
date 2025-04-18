import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DeleteCustomerService } from '../infrastructure/services/delete-customer/delete-customer.service';
import { CustomerState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerUseCase {
  private readonly _service = inject(DeleteCustomerService);
  private readonly _state = inject(CustomerState);
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
        const currentCustomers = this._state.customers.customers.snapshot();
        const updatedCustomers = currentCustomers.filter((c) => c.id !== id);
        this._state.customers.customers.set(updatedCustomers);
      })
    );
  }
}
