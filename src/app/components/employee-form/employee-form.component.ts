import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  employee: Employee = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: 'Active',
    group: '',
    description: ''
  };
  groups: string[] = [];
  showGroupDropdown = false;
  groupFilter = '';
  errorMessage = '';
  today = new Date().toISOString().split('T')[0];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.groups = this.employeeService.getGroups();
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.isFormValid()) {
      this.errorMessage = 'All fields are required and must follow the expected format.';
      return;
    }

    const salary = Number(this.employee.basicSalary);
    if (Number.isNaN(salary)) {
      this.errorMessage = 'Basic salary must be a valid number.';
      return;
    }

    const birthDate = new Date(this.employee.birthDate);
    const today = new Date(this.today);
    if (birthDate > today) {
      this.errorMessage = 'Birth date cannot be in the future.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.employee.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.employee.basicSalary = salary;
    this.employeeService.addEmployee(this.employee);
    this.router.navigate(['/employees']);
  }

  toggleGroupDropdown(): void {
    this.showGroupDropdown = !this.showGroupDropdown;
  }

  selectGroup(group: string): void {
    this.employee.group = group;
    this.showGroupDropdown = false;
    this.groupFilter = '';
  }

  get filteredGroups(): string[] {
    return this.groups.filter((group) => group.toLowerCase().includes(this.groupFilter.toLowerCase()));
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }

  private isFormValid(): boolean {
    return Boolean(
      this.employee.username.trim() &&
      this.employee.firstName.trim() &&
      this.employee.lastName.trim() &&
      this.employee.email.trim() &&
      this.employee.birthDate &&
      this.employee.basicSalary !== null &&
      this.employee.group.trim() &&
      this.employee.status.trim() &&
      this.employee.description
    );
  }
}
