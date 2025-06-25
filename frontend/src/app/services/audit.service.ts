import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/audit';

  submitAudit(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');  

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.baseUrl}/criar`, formData, { headers });
  }
}
