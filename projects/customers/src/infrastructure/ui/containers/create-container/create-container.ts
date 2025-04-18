import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateCustomerUseCase } from '../../../../application/create-customer.usecase';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICustomer } from '../../../../domain/model/customer.response.interface';

@Component({
  selector: 'lib-create-container',
  standalone: true,
  imports: [CustomerFormComponent, CommonModule, FormsModule],
  templateUrl: './create-container.html',
})
export class CreateContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateCustomerUseCase);

  ngOnInit(): void {
    this._useCase.initSubscription();
  }

  onCreateUser(customerName: string): void {
    const newCustomer = { name: customerName } as ICustomer;
    this._useCase.execute(newCustomer);
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
