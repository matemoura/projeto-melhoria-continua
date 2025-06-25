import { inject, Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name: string;
  profile: string;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_BASE_URL = 'http://localhost:8080/api';
  private readonly LOGIN_URL = `${this.API_BASE_URL}/auth/login`;
  private readonly REGISTER_URL = `${this.API_BASE_URL}/auth/register`;
  private readonly tokenKey = 'token';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.LOGIN_URL, data);
  }

  register(data: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.REGISTER_URL, data);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._isLoggedIn$.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn$.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  refreshLoginStatus(): void {
    this._isLoggedIn$.next(this.isAuthenticated());
  }

  getCurrentUser(): { name: string; email: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        name: payload.name || '',
        email: payload.sub || ''
      };
    } catch {
      return null;
    }
  }
}
