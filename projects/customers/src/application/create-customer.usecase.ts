import { inject, Injectable } from '@angular/core';
import { CreateCustomerService } from '../infrastructure/services/create-customer/create-customer.service';
import { CustomerState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ICustomer } from '../domain/model/customer.response.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerUseCase {
  private readonly _service = inject(CreateCustomerService);
  private readonly _state = inject(CustomerState);
  private subscriptions: Subscription = new Subscription();

  customer$(): Observable<ICustomer[]> {
    return this._state.customers.customers.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(customer: ICustomer): void {
    this.subscriptions.add(
      this._service
        .execute(customer)
        .pipe(
          tap((newCustomer: ICustomer) => {
            const currentCustomers = this._state.customers.customers.snapshot();
            this._state.customers.customers.set([
              ...currentCustomers,
              newCustomer,
            ]);
          })
        )
        .subscribe()
    );
  }
}
