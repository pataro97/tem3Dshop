import { TestBed } from '@angular/core/testing';

import { Viewer3dService } from './viewer3d.service';

describe('Viewer3dService', () => {
  let service: Viewer3dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Viewer3dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
