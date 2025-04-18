import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { IDish } from '../../../../domain/model/dish.response.interface';
import { CardBtnComponent } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-dish-page',
  standalone: true,
  imports: [CommonModule, DishCardComponent, CardBtnComponent],
  templateUrl: './dish-page.component.html',
  styleUrls: ['./dish-page.component.scss'],
})
export class DishPageComponent {
  @Input() dishes: IDish[] = [];

  constructor(private router: Router) {}

  onCreateDish() {
    this.router.navigate(['/dishes/create']);
  }
}
