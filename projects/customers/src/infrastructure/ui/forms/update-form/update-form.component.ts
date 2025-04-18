import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';
import { ICustomer } from '../../../../domain/model/customer.response.interface';

@Component({
  selector: 'lib-update-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
})
export class UpdateFormComponent {
  @Input() customer: ICustomer;
  @Output() submitForm = new EventEmitter<{ id: number; name: string }>();

  onSubmit() {
    this.submitForm.emit({ id: this.customer.id, name: this.customer.name });
  }
}
