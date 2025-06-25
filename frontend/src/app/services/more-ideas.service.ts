import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface MoreIdeaRaw {
  nomeUsuario: string;
  emailUsuario: string;
  setor: string;
  descricaoProblema: string;
  possiveisSolucoes: string;
  impactos: string[];
  interference: number;
  expectedImprovement: number;
  kaizenNameSuggestion?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoreIdeasService {
  private apiUrl = 'http://localhost:8080/api/more-ideas';

  constructor(private http: HttpClient) { }

  loadIdeas(): Observable<MoreIdeaRaw[]> {
    return this.http.get<MoreIdeaRaw[]>(this.apiUrl);
  }

  submitIdea(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      tap(() => {
        this.loadIdeas().subscribe(); 
      })
    );
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
}
