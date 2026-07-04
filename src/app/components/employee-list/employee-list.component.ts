import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm = '';
  searchGroup = '';
  sortColumn: keyof Employee = 'firstName';
  sortDirection: 'asc' | 'desc' = 'asc';
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  alertMessage = '';
  alertType: 'success' | 'warning' | 'danger' = 'success';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.applyFilters();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  sortBy(column: keyof Employee): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  goToAddEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  openDetail(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  triggerEdit(employee: Employee): void {
    this.alertMessage = `Edit action triggered for ${employee.firstName} ${employee.lastName}.`;
    this.alertType = 'warning';
  }

  triggerDelete(employee: Employee): void {
    this.alertMessage = `Delete action triggered for ${employee.firstName} ${employee.lastName}.`;
    this.alertType = 'danger';
  }

  get visibleEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    const group = this.searchGroup.toLowerCase();

    this.filteredEmployees = this.employees
      .filter((employee) => {
        const matchesTerm = !term || (
          employee.firstName.toLowerCase().includes(term) ||
          employee.lastName.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term) ||
          employee.position.toLowerCase().includes(term)
        );
        const matchesGroup = !group || employee.group.toLowerCase().includes(group);
        return matchesTerm && matchesGroup;
      })
      .sort((a, b) => {
        const firstValue = a[this.sortColumn];
        const secondValue = b[this.sortColumn];
        const comparison = firstValue > secondValue ? 1 : firstValue < secondValue ? -1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });

    this.totalPages = Math.max(1, Math.ceil(this.filteredEmployees.length / this.pageSize));
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }
}
