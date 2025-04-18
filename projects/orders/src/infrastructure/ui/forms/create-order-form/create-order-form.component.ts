import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';
import { IOrder } from '../../../../domain/model/order.response.interface';
import { IDish } from 'dishes';
import { ListDishesUseCase } from 'dishes';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-create-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
})
export class CreateOrderFormComponent implements OnInit {
  customerId: number = 0;
  orderDishIds: number[] = [];
  availableDishes$: Observable<IDish[]>;

  @Output() submitForm = new EventEmitter<{
    customerId: number;
    dishIds: number[];
  }>();

  private readonly listDishesUseCase = inject(ListDishesUseCase);

  ngOnInit(): void {
    this.availableDishes$ = this.listDishesUseCase.dishes$();
    this.listDishesUseCase.execute();
  }

  onSubmit() {
    this.submitForm.emit({
      customerId: this.customerId,
      dishIds: this.orderDishIds,
    });
  }
}
