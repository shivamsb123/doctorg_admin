import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEarningPateintComponent } from './total-earning-pateint.component';

describe('TotalEarningPateintComponent', () => {
  let component: TotalEarningPateintComponent;
  let fixture: ComponentFixture<TotalEarningPateintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEarningPateintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEarningPateintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
