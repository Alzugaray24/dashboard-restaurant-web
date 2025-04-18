import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';

@Component({
  selector: 'lib-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  customerName: string = '';

  @Output() submitForm = new EventEmitter<string>();

  onSubmit() {
    this.submitForm.emit(this.customerName);
  }
}
