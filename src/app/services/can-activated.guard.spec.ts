import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActivatedGuard } from './can-activated.guard';

describe('canActivatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActivatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
