import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UpdateDishUseCase } from '../../../../application/update-dish.usecase';
import { UpdateDishFormComponent } from '../../forms/update-dish-form/update-dish-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDish } from '../../../../domain/model/dish.response.interface';

@Component({
  selector: 'lib-update-container',
  standalone: true,
  imports: [UpdateDishFormComponent, CommonModule, FormsModule],
  templateUrl: './update-container.component.html',
  styleUrls: ['./update-container.component.scss'],
})
export class UpdateContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(UpdateDishUseCase);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  dish: Partial<IDish> = { id: 0, name: '', price: 0 };

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.route.params.subscribe((params) => {
      this.dish.id = +params['id'];
      // Aquí deberías obtener el plato por su ID desde el estado o servicio
      // Por simplicidad, se asume que el plato ya está disponible
      this.dish.name = ''; // Placeholder
      this.dish.price = 0; // Placeholder
    });
  }

  onUpdateDish(dish: { name: string; price: number }): void {
    this._useCase.execute(this.dish.id, dish).subscribe((updatedDish) => {
      console.log('Dish updated:', updatedDish);
      this.router.navigate(['/dishes']);
    });
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
