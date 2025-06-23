import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IdeaFormData {
  name: string;
  email: string;
  department: string;
  problemDescription: string;
  possibleSolutions: string;
  impacts: string[];
  interference: number;
  expectedImprovement: number;
  kaizenNameSuggestion?: string;
}

export interface MoreIdea {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  setor: string;
  descricaoProblema: string;
  possiveisSolucoes?: string;
  impactos?: string[];
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoreIdeasService {
  private apiUrl = 'http://localhost:8080/api/more-ideas';
  constructor(private http: HttpClient) {}

  getAllIdeas(): Observable<MoreIdea[]> {
    return this.http.get<MoreIdea[]>(this.apiUrl);
  }

  submitIdea(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
