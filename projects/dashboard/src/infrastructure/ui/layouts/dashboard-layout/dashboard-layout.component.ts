import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent, SidebarItem } from "shared";

@Component({
  selector: "lib-dashboard-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent {
  @Input() title: string = "Sedap.";
  @Input() subtitle: string = "Restaurant Dashboard";

  @Input() navItems: SidebarItem[] = [
    { icon: "home", label: "Dashboard", link: "/", isActive: true },
    { icon: "shopping-bag", label: "Orders", link: "/orders" },
    { icon: "users", label: "Customers", link: "/customers" },
    { icon: "utensils", label: "Dishes", link: "/dishes" },
    { icon: "menu-square", label: "Menus", link: "/menus" },
  ];

  @Input() notificationContent = {
    title: "Please update your",
    subtitle: "KYC/Food license",
    buttonText: "Add Papers",
  };

  @Input() footerContent: string = `
    <p>Sedap Restaurant Admin Dashboard</p>
    <p>© 2023 All Rights Reserved</p>
    <p>Made with <span style="color: #ef4444;">❤</span> by Peterdraw</p>
  `;
}
