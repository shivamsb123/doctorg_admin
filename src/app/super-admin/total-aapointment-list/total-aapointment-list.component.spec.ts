import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAapointmentListComponent } from './total-aapointment-list.component';

describe('TotalAapointmentListComponent', () => {
  let component: TotalAapointmentListComponent;
  let fixture: ComponentFixture<TotalAapointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAapointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAapointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
