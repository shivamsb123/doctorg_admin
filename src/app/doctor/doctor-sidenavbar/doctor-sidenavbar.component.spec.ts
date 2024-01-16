import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSidenavbarComponent } from './doctor-sidenavbar.component';

describe('DoctorSidenavbarComponent', () => {
  let component: DoctorSidenavbarComponent;
  let fixture: ComponentFixture<DoctorSidenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSidenavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
