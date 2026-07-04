import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate at least 100 employees', () => {
    const employees = service.getEmployees();
    expect(employees.length).toBeGreaterThanOrEqual(100);
  });

  it('should return a employee by id', () => {
    const employees = service.getEmployees();
    const e = employees[0];
    const found = service.getEmployeeById(e.id);
    expect(found).toBeDefined();
    expect(found?.id).toEqual(e.id);
  });
});
