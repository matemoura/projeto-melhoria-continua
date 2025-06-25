import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AreaRanking {
  nomeArea: string;
  pontuacao: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuditRankingService {
  private apiUrl = 'http://localhost:8080/api/audit/ranking';

  constructor(private http: HttpClient) { }

  getTotalRanking(): Observable<AreaRanking[]> {
    return this.http.get<AreaRanking[]>(`${this.apiUrl}/total`);
  }

  getLatestAuditRanking(): Observable<AreaRanking[]> {
    return this.http.get<AreaRanking[]>(`${this.apiUrl}/latest`);
  }
}
