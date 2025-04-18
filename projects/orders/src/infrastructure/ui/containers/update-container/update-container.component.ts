import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UpdateOrderUseCase } from '../../../../application/update-order.usecase';
import { UpdateOrderFormComponent } from '../../forms/update-order-form/update-order-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../../../../domain/model/order.response.interface';

@Component({
  selector: 'lib-update-container',
  standalone: true,
  imports: [UpdateOrderFormComponent, CommonModule, FormsModule],
  templateUrl: './update-container.component.html',
  styleUrls: ['./update-container.component.scss'],
})
export class UpdateContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(UpdateOrderUseCase);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  order: Partial<IOrder> = {
    id: 0,
    customer: { id: 0, name: '', type: '' },
    dishes: [],
  };

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.route.params.subscribe((params) => {
      this.order.id = +params['id'];
      // Aquí deberías obtener la orden por su ID desde el estado o servicio
      // Por simplicidad, se asume que la orden ya está disponible
      this.order.customer.id = 0; // Placeholder
      this.order.dishes = []; // Placeholder
    });
  }

  onUpdateOrder(order: { customerId: number; dishIds: number[] }): void {
    const updatedOrder = {
      customerId: order.customerId,
      dishIds: order.dishIds,
    };
    this._useCase
      .execute(this.order.id, updatedOrder)
      .subscribe((updatedOrder) => {
        console.log('Order updated:', updatedOrder);
        this.router.navigate(['/orders']);
      });
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
