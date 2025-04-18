import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IDish } from '../../../../domain/model/dish.response.interface';
import { CardBtnComponent } from 'shared';
import { ModalComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { DeleteDishUseCase } from '../../../../application/delete-dish.usecase';

@Component({
  selector: 'lib-dish-card',
  standalone: true,
  imports: [CardBtnComponent, ModalComponent, CommonModule],
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() dish: IDish;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private deleteDishUseCase: DeleteDishUseCase
  ) {}

  onUpdate() {
    this.router.navigate(['/dishes/edit', this.dish.id]);
  }

  onDelete() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

  onConfirmDelete() {
    this.deleteDishUseCase.execute(this.dish.id).subscribe(() => {
      console.log('Plato eliminado:', this.dish.id);
      this.showModal = false;
    });
  }
}
