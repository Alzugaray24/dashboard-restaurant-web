import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from '../../buttons/buttons.component';

@Component({
  selector: 'lib-info-card',
  standalone: true,
  imports: [CommonModule, ButtonsComponent],
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() iconUrl: string = '';
  @Input() buttonText: string = '';
  @Input() bgColor: string = '#f0fdf4'; // Color verde claro por defecto
  @Input() textColor: string = '#10b981'; // Color verde por defecto
  @Input() buttonColor: string = 'white';

  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
