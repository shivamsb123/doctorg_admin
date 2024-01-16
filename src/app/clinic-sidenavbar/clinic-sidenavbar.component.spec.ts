import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSidenavbarComponent } from './clinic-sidenavbar.component';

describe('ClinicSidenavbarComponent', () => {
  let component: ClinicSidenavbarComponent;
  let fixture: ComponentFixture<ClinicSidenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicSidenavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicSidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
