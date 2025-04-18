import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  url?: string; // Optional for the last item
  icon?: string;
}

@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() items: BreadcrumbItem[] = [];
  @Input() autoGenerate: boolean = false;
  @Input() homeIcon: string = 'fa fa-home';
  @Input() maxItems: number = 5;
  @Input() showHome: boolean = true;

  displayItems: BreadcrumbItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.processItems();

    // If autoGenerate is enabled, listen to route changes
    if (this.autoGenerate) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.generateBreadcrumbs();
        });

      // Initial generation
      this.generateBreadcrumbs();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] || changes['maxItems'] || changes['showHome']) {
      this.processItems();
    }
  }

  /**
   * Process breadcrumb items applying limits and handling home item
   */
  private processItems() {
    let processedItems = [...this.items];

    // Check if we need to add a home item
    if (
      this.showHome &&
      (processedItems.length === 0 || processedItems[0]?.label !== 'Home')
    ) {
      processedItems.unshift({
        label: 'Home',
        url: '/',
        icon: this.homeIcon,
      });
    }

    // Apply max items limit if needed
    if (processedItems.length > this.maxItems) {
      // Keep first, last, and indicator
      const firstItem = processedItems[0];
      const lastItems = processedItems.slice(-2);

      this.displayItems = [
        firstItem,
        { label: '...', url: undefined },
        ...lastItems,
      ];
    } else {
      this.displayItems = processedItems;
    }
  }

  /**
   * Auto-generate breadcrumbs from the current route
   * This is a simplified implementation - in a real app,
   * you might want to use route data or a mapping service
   */
  private generateBreadcrumbs() {
    const urlSegments = this.router.url.split('/').filter((segment) => segment);
    const generatedItems: BreadcrumbItem[] = [];

    let currentUrl = '';

    // Home item is handled separately
    if (this.showHome) {
      generatedItems.push({
        label: 'Home',
        url: '/',
        icon: this.homeIcon,
      });
    }

    // Process URL segments
    urlSegments.forEach((segment, index) => {
      currentUrl += `/${segment}`;

      // Convert segment to label (capitalize and replace dashes with spaces)
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      generatedItems.push({
        label,
        url: index < urlSegments.length - 1 ? currentUrl : undefined,
      });
    });

    this.items = generatedItems;
    this.processItems();
  }
}
