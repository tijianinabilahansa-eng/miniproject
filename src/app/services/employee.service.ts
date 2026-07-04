import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = this.generateEmployees(105);
  private readonly groups = ['Engineering', 'Finance', 'HR', 'Operations', 'Marketing', 'Sales', 'Legal', 'Design', 'Support', 'Research'];

  getEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }

  addEmployee(employee: Employee): void {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now()
    };
    this.employees = [newEmployee, ...this.employees];
  }

  getGroups(): string[] {
    return [...this.groups];
  }

  private generateEmployees(count: number): Employee[] {
    const firstNames = ['Ari', 'Bima', 'Citra', 'Dewi', 'Eko', 'Fira', 'Gilang', 'Hana', 'Indra', 'Joko', 'Kiki', 'Laras', 'Miko', 'Nina', 'Omar', 'Pia', 'Raka', 'Sari', 'Tara', 'Umar'];
    const lastNames = ['Santoso', 'Wijaya', 'Pratama', 'Lestari', 'Nugroho', 'Putri', 'Sari', 'Rahman', 'Hakim', 'Azzahra', 'Darmawan', 'Yuliana', 'Arifin', 'Kusuma', 'Ramadhan', 'Siregar', 'Purnama', 'Permata', 'Hidayat', 'Nugraha'];
    const positions = ['Software Engineer', 'Account Manager', 'HR Specialist', 'Operations Lead', 'Marketing Analyst', 'Sales Executive', 'Legal Counsel', 'Product Designer', 'Customer Support', 'Researcher'];
    const addresses = ['Bandung', 'Jakarta', 'Yogyakarta', 'Surabaya', 'Semarang', 'Medan', 'Bali', 'Palembang', 'Makassar', 'Pontianak'];

    return Array.from({ length: count }, (_, index) => {
      const firstName = firstNames[index % firstNames.length];
      const lastName = lastNames[(index + 3) % lastNames.length];
      const position = positions[index % positions.length];
      const group = this.groups[index % this.groups.length];
      const salary = 6000000 + ((index * 173) % 20000000);
      const birthDate = new Date(1990 + (index % 20), (index + 2) % 12, (index % 28) + 1);
      const hireDate = new Date(2018 + (index % 7), (index + 1) % 12, (index % 27) + 1);

      return {
        id: index + 1,
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@example.com`,
        phone: `+62${(800000000 + index).toString().slice(0, 10)}`,
        birthDate: birthDate.toISOString().split('T')[0],
        basicSalary: salary,
        group,
        position,
        address: `${addresses[index % addresses.length]} ${index + 1}`,
        hireDate: hireDate.toISOString().split('T')[0]
      };
    });
  }
}
