import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedImgPopupComponent } from './tagged-img-popup.component';

describe('TaggedImgPopupComponent', () => {
  let component: TaggedImgPopupComponent;
  let fixture: ComponentFixture<TaggedImgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggedImgPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedImgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
