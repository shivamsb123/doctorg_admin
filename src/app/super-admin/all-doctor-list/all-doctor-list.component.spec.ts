import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDoctorListComponent } from './all-doctor-list.component';

describe('AllDoctorListComponent', () => {
  let component: AllDoctorListComponent;
  let fixture: ComponentFixture<AllDoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDoctorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
