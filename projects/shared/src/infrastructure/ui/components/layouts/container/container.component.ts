import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ContainerPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ContainerWidth = 'full' | 'wide' | 'medium' | 'narrow';

@Component({
  selector: 'lib-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  @Input() padding: ContainerPadding = 'md';
  @Input() paddingTop: ContainerPadding | null = null;
  @Input() paddingBottom: ContainerPadding | null = null;
  @Input() paddingLeft: ContainerPadding | null = null;
  @Input() paddingRight: ContainerPadding | null = null;
  @Input() width: ContainerWidth = 'medium';
  @Input() background: boolean = false;
  @Input() bordered: boolean = false;
  @Input() rounded: boolean = false;
  @Input() shadow: 'none' | 'sm' | 'md' | 'lg' = 'none';
  @Input() centered: boolean = false;

  @HostBinding('class') get hostClasses(): string {
    const classes: string[] = ['container'];

    // Add padding classes
    if (this.padding !== 'none') {
      classes.push(`container--padding-${this.padding}`);
    }

    // Add specific padding direction classes if specified
    if (this.paddingTop) {
      classes.push(`container--padding-top-${this.paddingTop}`);
    }

    if (this.paddingBottom) {
      classes.push(`container--padding-bottom-${this.paddingBottom}`);
    }

    if (this.paddingLeft) {
      classes.push(`container--padding-left-${this.paddingLeft}`);
    }

    if (this.paddingRight) {
      classes.push(`container--padding-right-${this.paddingRight}`);
    }

    // Add width class
    classes.push(`container--width-${this.width}`);

    // Add optional styling classes
    if (this.background) {
      classes.push('container--background');
    }

    if (this.bordered) {
      classes.push('container--bordered');
    }

    if (this.rounded) {
      classes.push('container--rounded');
    }

    if (this.shadow !== 'none') {
      classes.push(`container--shadow-${this.shadow}`);
    }

    if (this.centered) {
      classes.push('container--centered');
    }

    return classes.join(' ');
  }
}
