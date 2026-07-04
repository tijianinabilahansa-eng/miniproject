export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; // ISO datetime string
  basicSalary: number;
  status: string;
  group: string;
  description: string; // ISO datetime string (per spec)
}
