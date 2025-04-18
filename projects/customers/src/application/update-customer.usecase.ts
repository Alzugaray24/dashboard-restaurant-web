import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICustomer } from '../domain/model/customer.response.interface';
import { UpdateCustomerService } from '../infrastructure/services/update-customer/update-customer.service';
import { CustomerState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerUseCase {
  private readonly _service = inject(UpdateCustomerService);
  private readonly _state = inject(CustomerState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number, name: string): Observable<ICustomer> {
    return this._service.execute(id, { name } as ICustomer).pipe(
      tap((updatedCustomer: ICustomer) => {
        console.log('use case', updatedCustomer);

        const currentCustomers = this._state.customers.customers.snapshot();
        const updatedCustomers = currentCustomers.map((c) =>
          c.id === updatedCustomer.id ? updatedCustomer : c
        );
        this._state.customers.customers.set(updatedCustomers);
      })
    );
  }
}
