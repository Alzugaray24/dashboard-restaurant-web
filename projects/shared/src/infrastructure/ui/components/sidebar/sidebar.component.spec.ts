import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';
import { IconsComponent } from '../icons/icons.component';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and subtitle', () => {
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.sidebar__title'));
    const subtitleElement = fixture.debugElement.query(
      By.css('.sidebar__subtitle')
    );

    expect(titleElement.nativeElement.textContent).toContain('Test Title');
    expect(subtitleElement.nativeElement.textContent).toContain(
      'Test Subtitle'
    );
  });

  it('should render navigation items', () => {
    component.navItems = [
      { icon: 'home', label: 'Dashboard', link: '/dashboard', isActive: true },
      { icon: 'shopping-bag', label: 'Orders', link: '/orders' },
    ];
    fixture.detectChanges();

    const navItems = fixture.debugElement.queryAll(
      By.css('.sidebar__nav-item')
    );
    expect(navItems.length).toBe(2);

    const activeItem = fixture.debugElement.query(
      By.css('.sidebar__nav-link--active')
    );
    expect(activeItem.nativeElement.textContent).toContain('Dashboard');
  });

  it('should display notification when provided', () => {
    component.notificationContent = {
      title: 'Please update your',
      subtitle: 'KYC/Food license',
      buttonText: 'Add Papers',
    };
    fixture.detectChanges();

    const notification = fixture.debugElement.query(
      By.css('.sidebar__notification')
    );
    expect(notification).toBeTruthy();

    const notificationTitle = fixture.debugElement.query(
      By.css('.sidebar__notification-title')
    );
    const notificationButton = fixture.debugElement.query(
      By.css('.sidebar__notification-button')
    );

    expect(notificationTitle.nativeElement.textContent).toContain(
      'Please update your'
    );
    expect(notificationButton.nativeElement.textContent).toContain(
      'Add Papers'
    );
  });

  it('should not display notification when not provided', () => {
    component.notificationContent = undefined;
    fixture.detectChanges();

    const notification = fixture.debugElement.query(
      By.css('.sidebar__notification')
    );
    expect(notification).toBeFalsy();
  });

  it('should render footer content when provided', () => {
    component.footerContent = '<p>Test Footer</p>';
    fixture.detectChanges();

    const footer = fixture.debugElement.query(By.css('.sidebar__footer'));
    expect(footer).toBeTruthy();
    expect(footer.nativeElement.textContent).toContain('Test Footer');
  });
});
