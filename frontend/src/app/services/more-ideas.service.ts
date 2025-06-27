import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MoreIdeaRaw {
  id: number;
  nomeUsuario: string;
  emailUsuario?: string;
  setor: string;
  titulo: string;
  descricaoProblema: string;
  possiveisSolucoes?: string;
  impactos?: string[];
  interference?: number;
  expectedImprovement?: number;
  kaizenNameSuggestion?: string;
  status: string;
  imageUrl: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoreIdeasService {
  private apiUrl = 'http://localhost:8080/api/more-ideas';

  constructor(private http: HttpClient) {}

  loadIdeas(name?: string, status?: string): Observable<MoreIdeaRaw[]> {
    let params = new HttpParams();
    if (name) {
      params = params.append('name', name);
    }
    if (status) {
      params = params.append('status', status);
    }
    return this.http.get<MoreIdeaRaw[]>(this.apiUrl, { params });
  }

  submitIdea(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }

  getImage(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
