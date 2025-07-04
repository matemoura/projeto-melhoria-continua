import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditHistoryEntry } from '../models/audit-history-entry.model';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly API_BASE_URL = 'http://localhost:8080/api/audit';
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  saveAudit(auditData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/criar`, auditData);
  }

  getRanking(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/ranking`);
  }

  getAuditedAreas(): Observable<string[]> {
  return this.http.get<string[]>(`${this.API_BASE_URL}/areas`);
  }

  getHistoryByArea(areaName: string): Observable<AuditHistoryEntry[]> {
    return this.http.get<AuditHistoryEntry[]>(`${this.API_BASE_URL}/history/${areaName}`);
  }

  downloadImage(imageUrl: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${imageUrl}`, {
      responseType: 'blob'
    });
  }
}
