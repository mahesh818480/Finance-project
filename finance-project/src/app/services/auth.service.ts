import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = 'https://finance-project-ec2z.onrender.com/api';

  constructor(private http: HttpClient) { }
  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}