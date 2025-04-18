import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '../../../../domain/model/customer.response.interface';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { CommonModule } from '@angular/common';
import { CardBtnComponent } from 'shared';

@Component({
  selector: 'lib-customer-page',
  standalone: true,
  imports: [CustomerCardComponent, CommonModule, CardBtnComponent],
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss'],
})
export class CustomerPageComponent {
  @Input() customers: ICustomer[] = [];

  constructor(private router: Router) {}

  trackByFn(index: number, item: ICustomer): number {
    return item.id;
  }

  onCreateUser() {
    this.router.navigate(['/create']);
  }
}
