import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListDishesUseCase } from '../../../../application/list-dish.usecase';
import { Observable } from 'rxjs';
import { IDish } from '../../../../domain/model/dish.response.interface';
import { AsyncPipe } from '@angular/common';
import { DishPageComponent } from '../../components/dish-page/dish-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-list-container',
  standalone: true,
  imports: [AsyncPipe, DishPageComponent, CommonModule],
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(ListDishesUseCase);
  public dishes$: Observable<IDish[]>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAllDishes();
    this.dishes$ = this._useCase.dishes$();
  }

  getAllDishes(): void {
    console.log('getAllDishes');
    this._useCase.execute();
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
