import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SectionHeaderFilter {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  count?: number;
}

@Component({
  selector: 'lib-section-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() filters: SectionHeaderFilter[] = [];
  @Input() showFilters: boolean = true;
  @Input() showActions: boolean = true;
  @Input() loading: boolean = false;

  @Output() filterSelected = new EventEmitter<SectionHeaderFilter>();

  @ContentChild('headerActions') headerActionsTemplate?: TemplateRef<any>;
  @ContentChild('headerContent') headerContentTemplate?: TemplateRef<any>;

  /**
   * Toggle a filter active state and emit event
   */
  selectFilter(filter: SectionHeaderFilter) {
    // If the filter is already active, don't do anything
    if (filter.active) return;

    // Set the selected filter as active and deactivate others
    this.filters = this.filters.map((f) => ({
      ...f,
      active: f.id === filter.id,
    }));

    // Emit the selected filter
    this.filterSelected.emit(filter);
  }
}
