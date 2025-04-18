import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { IconsComponent } from '../../components/icons/icons.component';

// Creamos un mock para el componente Sidebar
@Component({
  selector: 'lib-sidebar',
  template: '<div class="sidebar-mock"></div>',
})
class MockSidebarComponent {
  title: string;
  subtitle: string;
  navItems: any[];
  notificationContent: any;
  footerContent: string;
}

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MockSidebarComponent],
      providers: [],
    }).compileComponents();

    TestBed.overrideComponent(DashboardLayoutComponent, {
      set: {
        imports: [RouterTestingModule],
        declarations: [],
      },
    });

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a sidebar', () => {
    const sidebarElement = fixture.debugElement.query(
      By.css('.dashboard-layout__sidebar')
    );
    expect(sidebarElement).toBeTruthy();
  });

  it('should have content area', () => {
    const contentElement = fixture.debugElement.query(
      By.css('.dashboard-layout__content')
    );
    expect(contentElement).toBeTruthy();
  });

  it('should pass default navigation items to sidebar', () => {
    expect(component.navItems.length).toBe(5);
    expect(component.navItems[0].icon).toBe('home');
    expect(component.navItems[0].label).toBe('Dashboard');
  });
});
