import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/audits';

  submitAudit(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/submit`, formData);
  }
}
