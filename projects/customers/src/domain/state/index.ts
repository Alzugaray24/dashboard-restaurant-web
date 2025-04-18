import { inject, Injectable } from '@angular/core';
import { CustomersState } from './customer.state';

@Injectable({
  providedIn: 'root',
})
export class CustomerState {
  private readonly _customers = inject(CustomersState);

  get customers() {
    return this._customers.store();
  }
}
