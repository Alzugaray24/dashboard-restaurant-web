import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateDishUseCase } from '../../../../application/create-dish.usecase';
import { CreateDishFormComponent } from '../../forms/create-dish-form/create-dish-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-dish-container',
  standalone: true,
  imports: [CreateDishFormComponent, CommonModule, FormsModule],
  templateUrl: './create-container.component.html',
})
export class CreateDishContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateDishUseCase);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this._useCase.initSubscription();
  }

  onCreateDish(dish: { name: string; price: number }): void {
    this._useCase.execute(dish).subscribe((newDish) => {
      console.log('Dish created:', newDish);
      this.router.navigate(['/dishes']);
    });
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
