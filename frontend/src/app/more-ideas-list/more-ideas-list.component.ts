import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http'; 

interface MoreIdea {
  id: number;
  nomeUsuario: string;
  descricaoProblema: string;
}

@Component({
  selector: 'app-more-ideas-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-ideas-list.component.html',
  styleUrls: ['./more-ideas-list.component.css']
})
export class MoreIdeasListComponent implements OnInit {
  ideas: MoreIdea[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchIdeas();
  }

  fetchIdeas() {
    this.http.get<MoreIdea[]>('/api/more-ideas').subscribe({
      next: (data) => {
        this.ideas = data;
      },
      error: (err) => {
        console.error('Erro ao buscar ideias:', err);
      }
    });
  }
}