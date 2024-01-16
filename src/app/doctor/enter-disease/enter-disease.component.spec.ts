import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDiseaseComponent } from './enter-disease.component';

describe('EnterDiseaseComponent', () => {
  let component: EnterDiseaseComponent;
  let fixture: ComponentFixture<EnterDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterDiseaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
