import { TestBed } from '@angular/core/testing';

import { MycourselistService } from './mycourselist.service';

describe('MycourselistService', () => {
  let service: MycourselistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycourselistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
