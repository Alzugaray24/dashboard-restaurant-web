import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { ICustomer } from '../model/customer.response.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersState {
  private readonly _factory = inject(StateFactory);
  private readonly customers$ = new BehaviorSubject<ICustomer[]>([]);

  store() {
    return {
      customers: this._factory.state(this.customers$),
    };
  }
}
