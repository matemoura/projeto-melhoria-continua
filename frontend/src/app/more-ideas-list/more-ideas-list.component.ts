import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreIdeasService, MoreIdea } from '../services/more-ideas.service';

@Component({
  selector: 'app-more-ideas-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-ideas-list.component.html',
  styleUrls: ['./more-ideas-list.component.css']
})
export class MoreIdeasListComponent implements OnInit {
  ideas: MoreIdea[] = [];
  isLoading = true;
  loadError = '';

  constructor(private moreIdeasService: MoreIdeasService) {}

  ngOnInit(): void {
    this.loadIdeas();
  }

  loadIdeas() {
    this.isLoading = true;
    this.loadError = '';

    this.moreIdeasService.getAllIdeas().subscribe({
      next: (data) => {
        this.ideas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar ideias:', err);
        this.loadError = 'Erro ao carregar as ideias. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }
}
