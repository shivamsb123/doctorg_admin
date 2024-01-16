import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsThemeComponent } from './forms-theme.component';

describe('FormsThemeComponent', () => {
  let component: FormsThemeComponent;
  let fixture: ComponentFixture<FormsThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
