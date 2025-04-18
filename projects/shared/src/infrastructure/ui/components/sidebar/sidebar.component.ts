import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';

export interface SidebarItem {
  icon: string;
  label: string;
  link: string;
  isActive?: boolean;
}

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() title: string = 'Restaurant';
  @Input() subtitle: string = 'Dashboard';
  @Input() navItems: SidebarItem[] = [];
  @Input() footerContent: string = '';
  @Input() brandLogo?: string;
  @Input() notificationContent?: {
    title: string;
    subtitle: string;
    buttonText: string;
    iconUrl?: string;
  };

  // Método para determinar si un elemento está activo
  isActive(item: SidebarItem): boolean {
    return item.isActive || false;
  }
}
