import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';

@Component({
  selector: 'lib-dish-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './create-dish-form.component.html',
  styleUrls: ['./create-dish-form.component.scss'],
})
export class CreateDishFormComponent {
  dishName: string = '';
  dishPrice: number = 0;

  @Output() submitForm = new EventEmitter<{ name: string; price: number }>();

  onSubmit() {
    this.submitForm.emit({ name: this.dishName, price: this.dishPrice });
  }
}
