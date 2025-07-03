import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, of } from 'rxjs';
import { SectorService } from './sector.service';
import { Sector } from '../models/sector.model';

export interface MonthlyData {
  month: number;
  goal: number;
  realized: number;
  gap: number;
}

export interface GapData {
  sector: string;
  monthlyData: MonthlyData[];
  totalGoal: number;
  totalRealized: number;
  totalGap: number;
}

export interface Goal {
  id?: number;
  year: number;
  month: number;
  sector: string;
  goal: number;
}

type IdeasCountResponse = Record<string, Record<number, number>>;

@Injectable({
  providedIn: 'root'
})

export class GapAnalysisService {
  private apiUrl = 'http://localhost:8080/api/gap-analysis';

  constructor(
    private http: HttpClient,
    private sectorService: SectorService
  ) { }

  private getGoals(year: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.apiUrl}/goals/${year}`);
  }

  private getIdeasCount(year: number): Observable<IdeasCountResponse> {
    return this.http.get<IdeasCountResponse>(`${this.apiUrl}/ideas-count/${year}`);
  }

  getGapAnalysisData(year: number): Observable<GapData[]> {
    return this.sectorService.sectors$.pipe(
      switchMap((sectors: Sector[]) => {
        if (sectors.length === 0) {
          return of<GapData[]>([]);
        }

        const data$: Observable<GapData[]> = forkJoin({
          goals: this.getGoals(year),
          ideasCount: this.getIdeasCount(year)
        }).pipe(
          map(response => {
            const { goals, ideasCount } = response;
            const sectorNames = sectors.map(s => s.name);
            
            const processedData: GapData[] = sectorNames.map(sector => {
              let totalGoal = 0;
              let totalRealized = 0;

              const monthlyData: MonthlyData[] = Array.from({ length: 12 }, (_, i) => {
                const month = i + 1;
                
                const goalObj = goals.find(g => g.sector === sector && g.month === month);
                const goal = goalObj ? goalObj.goal : 0;

                const realized = ideasCount[sector]?.[month] ?? 0;
                const gap = realized - goal;

                totalGoal += goal;
                totalRealized += realized;

                return { month, goal, realized, gap };
              });

              return {
                sector,
                monthlyData,
                totalGoal,
                totalRealized,
                totalGap: totalRealized - totalGoal
              };
            });

            return processedData;
          })
        );
        
        return data$;
      })
    );
  }

  setGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(`${this.apiUrl}/goals`, goal);
  }
}
