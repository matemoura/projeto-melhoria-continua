import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MoreIdeaRaw {
  id: number;
  nomeUsuario: string;
  emailUsuario?: string;
  setor: string;
  descricaoProblema: string;
  possiveisSolucoes?: string;
  impactos?: string[];
  interference?: number;
  expectedImprovement?: number;
  kaizenNameSuggestion?: string;
  kaizenName?: string;
  status: string;
  imageUrl: string;
  createdAt: string;
}

export interface UpdateMoreIdeaPayload {
    status?: string;
    kaizenName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoreIdeasService {
  private apiUrl = 'http://localhost:8080/api/more-ideas';

  constructor(private http: HttpClient) {}

  loadIdeas(term?: string, status?: string): Observable<MoreIdeaRaw[]> {
    let params = new HttpParams();
    if (term) {
      params = params.append('term', term);
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

  getIdeas(term: string = '', status: string = ''): Observable<MoreIdeaRaw[]> {
    let params = new HttpParams();
    if (term) {
      params = params.append('term', term);
    }
    if (status) {
      params = params.append('status', status);
    }
    return this.http.get<MoreIdeaRaw[]>(this.apiUrl, { params });
  }

  updateIdea(id: number, payload: UpdateMoreIdeaPayload): Observable<MoreIdeaRaw> {
    return this.http.patch<MoreIdeaRaw>(`${this.apiUrl}/${id}`, payload);
  }
}
