import { inject, Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  private readonly profileKey = 'profile';
  private readonly FORGOT_PASSWORD_URL = `${this.API_BASE_URL}/auth/forgot-password`;
  private readonly RESET_PASSWORD_URL = `${this.API_BASE_URL}/auth/reset-password`;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _userProfile$ = new BehaviorSubject<string | null>(this.getProfile());
  userProfile$ = this._userProfile$.asObservable();

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.LOGIN_URL, data).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.saveProfile(response.profile);
      })
    );
  }

  register(data: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.REGISTER_URL, data).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.saveProfile(response.profile);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.FORGOT_PASSWORD_URL, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(this.RESET_PASSWORD_URL, { token, password });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._isLoggedIn$.next(true);
  }

  saveProfile(profile: string): void {
    localStorage.setItem(this.profileKey, profile);
    this._userProfile$.next(profile);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getProfile(): string | null {
    return localStorage.getItem(this.profileKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.profileKey);
    this._isLoggedIn$.next(false);
    this._userProfile$.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const userProfile = this.getProfile();
    return userProfile ? userProfile.toLowerCase() === role.toLowerCase() : false;
  }
  
  hasAnyRole(roles: string[]): boolean {
    const userProfile = this.getProfile();
    if (!userProfile) {
      return false;
    }
    return roles.some(role => userProfile.toLowerCase() === role.toLowerCase());
  }

  refreshLoginStatus(): void {
    this._isLoggedIn$.next(this.isAuthenticated());
    this._userProfile$.next(this.getProfile());
  }

  getCurrentUser(): { name: string; email: string, profile: string } | null {
    const token = this.getToken();
    const profile = this.getProfile();
    if (!token || !profile) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        name: payload.name || '',
        email: payload.sub || '',
        profile: profile
      };
    } catch {
      return null;
    }
  }
}
