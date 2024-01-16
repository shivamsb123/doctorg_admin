import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPateintComponent } from './total-pateint.component';

describe('TotalPateintComponent', () => {
  let component: TotalPateintComponent;
  let fixture: ComponentFixture<TotalPateintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPateintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPateintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
