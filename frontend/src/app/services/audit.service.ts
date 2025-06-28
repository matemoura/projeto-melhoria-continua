import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly API_BASE_URL = 'http://localhost:8080/api/audit';

  constructor(private http: HttpClient) { }

  saveAudit(auditData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/new`, auditData);
  }

  getRanking(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/ranking`);
  }
}
