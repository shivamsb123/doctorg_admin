import { TestBed } from '@angular/core/testing';

import { OthenticationService } from './othentication.service';

describe('OthenticationService', () => {
  let service: OthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
