import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';
import { IDish } from '../../../../domain/model/dish.response.interface';

@Component({
  selector: 'lib-update-dish-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './update-dish-form.component.html',
  styleUrls: ['./update-dish-form.component.scss'],
})
export class UpdateDishFormComponent {
  @Input() dish: Partial<IDish> = { name: '', price: 0 };
  @Output() submitForm = new EventEmitter<{ name: string; price: number }>();

  onSubmit() {
    this.submitForm.emit({ name: this.dish.name, price: this.dish.price });
  }
}
