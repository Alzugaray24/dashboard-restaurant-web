import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrder } from '../../../../domain/model/order.response.interface';
import { OrderCardComponent } from '../order-card/order-card.component';
import { CardBtnComponent } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-order-page',
  standalone: true,
  imports: [CommonModule, OrderCardComponent, CardBtnComponent],
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent {
  @Input() orders: IOrder[] = [];

  constructor(private router: Router) {}

  onCreateOrder() {
    this.router.navigate(['orders/create']);
  }
}
