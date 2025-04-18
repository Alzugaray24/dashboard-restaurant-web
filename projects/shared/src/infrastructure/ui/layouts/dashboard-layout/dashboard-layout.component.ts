import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SidebarComponent,
  SidebarItem,
} from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'lib-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent {
  @Input() title: string = 'Sedap.';
  @Input() subtitle: string = 'Restaurant Dashboard';

  @Input() navItems: SidebarItem[] = [
    { icon: 'home', label: 'Dashboard', link: '/dashboard', isActive: true },
    { icon: 'shopping-bag', label: 'Orders', link: '/orders' },
    { icon: 'users', label: 'Customers', link: '/customers' },
    { icon: 'utensils', label: 'Dishes', link: '/dishes' },
    { icon: 'menu-square', label: 'Menus', link: '/menus' },
  ];

  @Input() notificationContent = {
    title: 'Please update your',
    subtitle: 'KYC/Food license',
    buttonText: 'Add Papers',
  };

  @Input() footerContent: string = `
    <p>Sedap Restaurant Admin Dashboard</p>
    <p>© ${new Date().getFullYear()} All Rights Reserved</p>
    <div style="display: flex; align-items: center; margin-top: 4px;">
      <p>Made with</p>
      <span style="color: #ef4444; margin: 0 4px;">❤</span>
      <p>by Peterdraw</p>
    </div>
  `;
}
