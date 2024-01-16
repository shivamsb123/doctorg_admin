import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDoctorComponent } from './total-doctor.component';

describe('TotalDoctorComponent', () => {
  let component: TotalDoctorComponent;
  let fixture: ComponentFixture<TotalDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
