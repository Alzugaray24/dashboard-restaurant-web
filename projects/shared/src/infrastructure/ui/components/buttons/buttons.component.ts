import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  @Input() type: 'primary' | 'outline' | 'icon' | 'circle' = 'primary';
  @Input() icon: string | null = null;
  @Input() disabled: boolean = false;
  @Input() text: string = '';
  @Input() color: 'green' | 'white' | 'default' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullWidth: boolean = false;

  get buttonClasses(): string {
    const classes = ['button'];

    classes.push(`button--${this.type}`);

    if (this.color !== 'default') {
      classes.push(`button--${this.color}`);
    }

    if (this.size !== 'medium') {
      classes.push(`button--${this.size}`);
    }

    if (this.fullWidth) {
      classes.push('button--full-width');
    }

    if (this.disabled) {
      classes.push('button--disabled');
    }

    return classes.join(' ');
  }
}
