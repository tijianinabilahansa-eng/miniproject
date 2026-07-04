import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authenticated = false;

  login(username: string, password: string): boolean {
    const valid = username === 'admin' && password === 'password123';
    this.authenticated = valid;
    return valid;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout(): void {
    this.authenticated = false;
  }
}
