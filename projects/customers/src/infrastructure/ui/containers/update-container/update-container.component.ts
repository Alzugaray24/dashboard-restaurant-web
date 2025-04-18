import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UpdateCustomerUseCase } from '../../../../application/update-customer.usecase';
import { UpdateFormComponent } from '../../forms/update-form/update-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from '../../../../domain/model/customer.response.interface';

@Component({
  selector: 'lib-update-container',
  standalone: true,
  imports: [UpdateFormComponent, CommonModule, FormsModule],
  templateUrl: './update-container.component.html',
})
export class UpdateContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(UpdateCustomerUseCase);
  private readonly route = inject(ActivatedRoute);
  customerId: number;
  customerName: string = '';

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.route.params.subscribe((params) => {
      this.customerId = +params['id'];

      this.customerName = '';
    });
  }

  onUpdateUser(customerName: string): void {
    this._useCase
      .execute(this.customerId, customerName)
      .subscribe((customer) => {
        console.log('Customer updated:', customer);
        // Aquí puedes manejar la lógica adicional después de actualizar el cliente
      });
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
