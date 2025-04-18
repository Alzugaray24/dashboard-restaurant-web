import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto';
export type GridResponsiveConfig = {
  xs?: GridColumns;
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
  xl?: GridColumns;
};

@Component({
  selector: 'lib-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() columns: GridColumns | GridResponsiveConfig = 12;
  @Input() gap: GridGap = 'md';
  @Input() rowGap: GridGap | null = null;
  @Input() columnGap: GridGap | null = null;
  @Input() alignItems: 'start' | 'center' | 'end' | 'stretch' = 'start';
  @Input() justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' =
    'start';
  @Input() fullWidth = true;
  @Input() fullHeight = false;

  @HostBinding('class') get hostClasses(): string {
    const classes: string[] = ['grid'];

    // Add gap classes
    if (this.gap !== 'none') {
      classes.push(`grid--gap-${this.gap}`);
    }

    if (this.rowGap && this.rowGap !== 'none') {
      classes.push(`grid--row-gap-${this.rowGap}`);
    }

    if (this.columnGap && this.columnGap !== 'none') {
      classes.push(`grid--column-gap-${this.columnGap}`);
    }

    // Add alignment classes
    classes.push(`grid--align-${this.alignItems}`);
    classes.push(`grid--justify-${this.justifyContent}`);

    // Add width/height classes
    if (this.fullWidth) {
      classes.push('grid--full-width');
    }

    if (this.fullHeight) {
      classes.push('grid--full-height');
    }

    // Add column classes based on input type
    if (typeof this.columns === 'object') {
      // Responsive configuration
      Object.entries(this.columns).forEach(([breakpoint, cols]) => {
        if (cols) {
          classes.push(`grid--cols-${cols}-${breakpoint}`);
        }
      });
    } else {
      // Single value
      if (this.columns !== 'auto') {
        classes.push(`grid--cols-${this.columns}`);
      } else {
        classes.push('grid--cols-auto');
      }
    }

    return classes.join(' ');
  }
}
