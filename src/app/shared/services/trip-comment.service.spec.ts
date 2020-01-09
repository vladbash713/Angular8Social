import { TestBed } from '@angular/core/testing';

import { TripCommentService } from './trip-comment.service';

describe('TripCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripCommentService = TestBed.get(TripCommentService);
    expect(service).toBeTruthy();
  });
});
