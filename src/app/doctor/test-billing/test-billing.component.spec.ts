import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBillingComponent } from './test-billing.component';

describe('TestBillingComponent', () => {
  let component: TestBillingComponent;
  let fixture: ComponentFixture<TestBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
