import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Sector } from '../models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private apiUrl = 'http://localhost:8080/api/sectors';
  private http = inject(HttpClient);

  private sectorsSubject = new BehaviorSubject<Sector[]>([]);
  
  public sectors$ = this.sectorsSubject.asObservable();

  constructor() {
    this.loadSectors(); 
  }

  loadSectors(): void {
    this.http.get<Sector[]>(this.apiUrl).subscribe(data => {
      this.sectorsSubject.next(data);
    });
  }

  createSector(sector: { name: string }): Observable<Sector> {
    return this.http.post<Sector>(this.apiUrl, sector).pipe(
      tap(() => this.loadSectors()) 
    );
  }

  deleteSector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadSectors()) 
    );
  }
}
