import { TestBed } from '@angular/core/testing';

import { TripViewService } from './trip-view.service';

describe('TripViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripViewService = TestBed.get(TripViewService);
    expect(service).toBeTruthy();
  });
});
