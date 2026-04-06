import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  register(user: any) {
    const users = this.getUsers();
    const exist = users.find((u: any) => u.email === user.email);
    if (exist) {
      return { success: false, message: 'User already exists' };
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true };
  }

  login(data: any) {
    const users = this.getUsers();

    const user = users.find(
      (u: any) =>
        u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    }

    return { success: false, message: 'Invalid credentials' };
  }

  private getUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}