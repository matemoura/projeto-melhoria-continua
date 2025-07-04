import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AreaRanking {
  nomeArea: string;
  pontuacao: number;
}

export interface AuditedArea {
  id: number;
  nomeArea: string;
  seiri: number;
  seiton: number;
  seiso: number;
  seiketsu: number;
  shitsuke: number;
  notaFinal: number;
  audit: {
    id: number;
    auditor: string;
    auditDateTime: string;
    imageUrl?: string; 
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuditRankingService {
  private apiUrl = 'http://localhost:8080/api/audit/ranking';
  private apiHistoryUrl = 'http://localhost:8080/api/audit/history';

  constructor(private http: HttpClient) { }

  getTotalRanking(): Observable<AreaRanking[]> {
    return this.http.get<AreaRanking[]>(`${this.apiUrl}/total`);
  }

  getLatestAuditRanking(): Observable<AreaRanking[]> {
    return this.http.get<AreaRanking[]>(`${this.apiUrl}/latest`);
  }

  getAuditHistoryForArea(areaName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiHistoryUrl}/${areaName}`);
  }
}
