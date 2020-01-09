import { TestBed } from '@angular/core/testing';

import { TripRecommendService } from './trip-recommend.service';

describe('TripRecommendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripRecommendService = TestBed.get(TripRecommendService);
    expect(service).toBeTruthy();
  });
});
