import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDiseaseListComponent } from './enter-disease-list.component';

describe('EnterDiseaseListComponent', () => {
  let component: EnterDiseaseListComponent;
  let fixture: ComponentFixture<EnterDiseaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterDiseaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterDiseaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
