import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsComponent } from './icons.component';
import { By } from '@angular/platform-browser';

describe('IconsComponent', () => {
  let component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon with correct name', () => {
    component.name = 'home';
    component.ngOnChanges({});
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.icon'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.innerHTML).toContain('<svg');
  });

  it('should apply size classes correctly', () => {
    component.size = 'small';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.icon'));
    expect(iconElement.classes['icon--small']).toBeTruthy();

    component.size = 'large';
    fixture.detectChanges();

    expect(iconElement.classes['icon--large']).toBeTruthy();
  });

  it('should apply custom class when provided', () => {
    component.customClass = 'test-class';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.icon'));
    expect(iconElement.classes['test-class']).toBeTruthy();
  });

  it('should use custom SVG content when provided', () => {
    const testSvg = '<svg><circle cx="50" cy="50" r="40"></circle></svg>';
    component.svgContent = testSvg;
    component.ngOnChanges({});
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.icon'));
    expect(iconElement.nativeElement.innerHTML).toContain('<circle');
  });
});
