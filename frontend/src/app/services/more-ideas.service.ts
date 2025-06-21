import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MoreIdea {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  setor: string;
  descricaoProblema: string;
  possiveisSolucoes?: string;
  impactos?: string[];
  imagemUrl?: string;
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
}
