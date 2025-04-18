import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '../../../../domain/model/customer.response.interface';
import { CardBtnComponent } from 'shared';
import { ModalComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { DeleteCustomerUseCase } from '../../../../application/delete-customer.usecae';

@Component({
  selector: 'lib-customer-card',
  imports: [CardBtnComponent, ModalComponent, CommonModule],
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
})
export class CustomerCardComponent {
  @Input() customer: ICustomer;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private deleteCustomerUseCase: DeleteCustomerUseCase
  ) {}

  onUpdate() {
    this.router.navigate(['/edit', this.customer.id]);
  }

  onDelete() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

  onConfirmDelete() {
    this.deleteCustomerUseCase.execute(this.customer.id).subscribe(() => {
      console.log('Cliente eliminado:', this.customer.id);
      this.showModal = false;
    });
  }
}
