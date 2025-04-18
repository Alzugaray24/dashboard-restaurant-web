import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsComponent } from './buttons.component';
import { By } from '@angular/platform-browser';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render primary button by default', () => {
    component.text = 'Test Button';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.classes['button--primary']).toBeTruthy();
  });

  it('should render outline button when type is set to outline', () => {
    component.type = 'outline';
    component.text = 'Outline Button';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    expect(buttonElement.classes['button--outline']).toBeTruthy();
  });

  it('should render icon button when type is set to icon', () => {
    component.type = 'icon';
    component.icon = '<svg></svg>';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    expect(buttonElement.classes['button--icon']).toBeTruthy();
  });

  it('should render circle button when type is set to circle', () => {
    component.type = 'circle';
    component.icon = '<svg></svg>';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    expect(buttonElement.classes['button--circle']).toBeTruthy();
  });

  it('should apply disabled state', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    expect(buttonElement.classes['button--disabled']).toBeTruthy();
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });

  it('should apply full-width modifier', () => {
    component.fullWidth = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    expect(buttonElement.classes['button--full-width']).toBeTruthy();
  });

  it('should apply color variants', () => {
    component.color = 'green';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    expect(buttonElement.classes['button--green']).toBeTruthy();
  });
});
