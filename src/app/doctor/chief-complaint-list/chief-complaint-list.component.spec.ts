import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefComplaintListComponent } from './chief-complaint-list.component';

describe('ChiefComplaintListComponent', () => {
  let component: ChiefComplaintListComponent;
  let fixture: ComponentFixture<ChiefComplaintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiefComplaintListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiefComplaintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
