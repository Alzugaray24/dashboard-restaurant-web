import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';
import { IOrder } from '../../../../domain/model/order.response.interface';
import { IDish } from 'dishes';
import { ListDishesUseCase } from 'dishes';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-update-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './update-order-form.component.html',
  styleUrls: ['./update-order-form.component.scss'],
})
export class UpdateOrderFormComponent implements OnInit {
  @Input() order: Partial<IOrder> = {
    customer: { id: 0, name: '', type: '' },
    dishes: [],
  };
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
    const dishIds = this.order.dishes.map((dish) => dish.id);
    this.submitForm.emit({ customerId: this.order.customer.id, dishIds });
  }
}
