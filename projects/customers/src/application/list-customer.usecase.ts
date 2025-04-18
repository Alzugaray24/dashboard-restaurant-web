import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICustomer } from '../domain/model/customer.response.interface';
import { ListCustomerService } from '../infrastructure/services/list-customer/list-customer.service';
import { CustomerState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class GetAllCustomerUseCase {
  private readonly _service = inject(ListCustomerService);
  private readonly _state = inject(CustomerState);
  private subscriptions: Subscription = new Subscription();

  customers$(): Observable<ICustomer[]> {
    return this._state.customers.customers.$();
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
          tap((customers: ICustomer[]) =>
            this._state.customers.customers.set(customers)
          )
        )
        .subscribe()
    );
  }
}
