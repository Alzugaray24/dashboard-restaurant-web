import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListOrdersUseCase } from '../../../../application/list-order.usecase';
import { Observable } from 'rxjs';
import { IOrder } from '../../../../domain/model/order.response.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { OrderPageComponent } from '../../components/order-page/order-page.component';

@Component({
  selector: 'lib-list-container',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, OrderPageComponent],
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(ListOrdersUseCase);
  public orders$: Observable<IOrder[]>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAllOrders();
    this.orders$ = this._useCase.orders$();
  }

  getAllOrders(): void {
    console.log('getAllOrders');
    this._useCase.execute();
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
