import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Goal {
  id?: number;
  year: number;
  month: number;
  sector: string;
  goal: number;
}

@Injectable({
  providedIn: 'root'
})

export class GapAnalysisService {
  private apiUrl = 'http://localhost:8080/api/gap-analysis';

  constructor(private http: HttpClient) { }

  getGoals(year: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.apiUrl}/goals/${year}`);
  }

  setGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(`${this.apiUrl}/goals`, goal);
  }

  getIdeasCount(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ideas-count/${year}`);
  }
}