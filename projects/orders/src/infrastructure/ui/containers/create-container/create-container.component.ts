import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateOrderUseCase } from '../../../../application/create-order.usecase';
import { CreateOrderFormComponent } from '../../forms/create-order-form/create-order-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-container',
  standalone: true,
  imports: [CreateOrderFormComponent, CommonModule, FormsModule],
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.scss'],
})
export class CreateContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateOrderUseCase);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this._useCase.initSubscription();
  }

  onCreateOrder(order: { customerId: number; dishIds: number[] }): void {
    this._useCase.execute(order).subscribe((newOrder) => {
      console.log('Order created:', newOrder);
      this.router.navigate(['/orders']);
    });
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
