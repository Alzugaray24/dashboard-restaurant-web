import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from '../../icons/icons.component';

@Component({
  selector: 'lib-stat-card',
  standalone: true,
  imports: [CommonModule, IconsComponent],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() subtitle: string = '';
  @Input() icon: string = '';
  @Input() iconColor: string = '#10B981'; // Color verde por defecto
  @Input() iconBgColor: string = 'rgba(16, 185, 129, 0.1)'; // Fondo verde claro por defecto
  @Input() trendValue: string = '';
  @Input() trendDirection: 'up' | 'down' | 'neutral' = 'neutral';
}
