import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../../../domain/model/order.response.interface';
import { CardBtnComponent } from 'shared';
import { ModalComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { DeleteOrderUseCase } from '../../../../application/delete-order.usecase';

@Component({
  selector: 'lib-order-card',
  standalone: true,
  imports: [CardBtnComponent, ModalComponent, CommonModule],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent {
  @Input() order: IOrder;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private deleteOrderUseCase: DeleteOrderUseCase
  ) {}

  onUpdate() {
    this.router.navigate(['orders/edit', this.order.id]);
  }

  onDelete() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

  onConfirmDelete() {
    this.deleteOrderUseCase.execute(this.order.id).subscribe(() => {
      console.log('Orden eliminada:', this.order.id);
      this.showModal = false;
    });
  }
}
