import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    canActivate: [authGuard],
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'add', component: EmployeeFormComponent },
      { path: ':id', component: EmployeeDetailComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
