import { TestBed } from '@angular/core/testing';

import { ListCustomerService } from './list-customer.service';

describe('ListCustomerService', () => {
  let service: ListCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
