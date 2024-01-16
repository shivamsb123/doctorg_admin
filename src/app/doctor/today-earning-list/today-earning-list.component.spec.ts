import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayEarningListComponent } from './today-earning-list.component';

describe('TodayEarningListComponent', () => {
  let component: TodayEarningListComponent;
  let fixture: ComponentFixture<TodayEarningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayEarningListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayEarningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
