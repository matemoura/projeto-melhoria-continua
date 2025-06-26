import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface MoreIdeaRaw {
  id: number;
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
  status: string;
}

export interface UpdateStatusPayload {
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoreIdeasService {
  private apiUrl = 'http://localhost:8080/api/more-ideas';

  constructor(private http: HttpClient) { }

  loadIdeas(name?: string): Observable<MoreIdeaRaw[]> {
    let params = new HttpParams();
    if (name) {
      params = params.append('name', name);
    }
    return this.http.get<MoreIdeaRaw[]>(this.apiUrl, { params });
  }

  updateIdeaStatus(id: number, payload: UpdateStatusPayload): Observable<any> {
    const url = `${this.apiUrl}/${id}/status`;
    return this.http.patch(url, payload);
  }

  submitIdea(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
}
