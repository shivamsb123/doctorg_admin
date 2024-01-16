import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteAppointmentListComponent } from './complete-appointment-list.component';

describe('CompleteAppointmentListComponent', () => {
  let component: CompleteAppointmentListComponent;
  let fixture: ComponentFixture<CompleteAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
