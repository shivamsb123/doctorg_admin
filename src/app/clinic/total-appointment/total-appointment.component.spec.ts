import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAppointmentComponent } from './total-appointment.component';

describe('TotalAppointmentComponent', () => {
  let component: TotalAppointmentComponent;
  let fixture: ComponentFixture<TotalAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
