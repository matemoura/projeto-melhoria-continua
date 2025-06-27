import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreIdeasService, MoreIdeaRaw } from '../services/more-ideas.service';
import { FormsModule } from '@angular/forms';

interface ManagedIdea {
  id: number;
  nomeUsuario: string;
  setor: string;
  titulo: string;
  descricaoProblema: string;
  status: string;
  newStatus?: string;
}

@Component({
  selector: 'app-manage-ideas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-ideas.component.html',
  styleUrls: ['./manage-ideas.component.css']
})
export class ManageIdeasComponent implements OnInit {

  ideas: ManagedIdea[] = [];
  statuses = ['PENDENTE', 'EM_ANALISE', 'APROVADA', 'REJEITADA', 'AGUARDANDO_A_IMPLEMENTACAO', 'IMPLEMENTADA'];
  isLoading = true;
  error = '';

  constructor(private moreIdeasService: MoreIdeasService) { }

  ngOnInit(): void {
    this.loadIdeas();
  }

  loadIdeas(): void {
    this.isLoading = true;
    this.moreIdeasService.loadIdeas().subscribe({
      next: (data: MoreIdeaRaw[]) => {
        this.ideas = data.map(idea => ({
          ...idea,
          newStatus: idea.status
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Falha ao carregar as ideias.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  updateStatus(idea: ManagedIdea): void {
    if (idea.newStatus && idea.status !== idea.newStatus) {
      this.moreIdeasService.updateStatus(idea.id, idea.newStatus).subscribe({
        next: () => {
          idea.status = idea.newStatus!;
        },
        error: (err) => {
          console.error('Falha ao atualizar o status', err);
          idea.newStatus = idea.status;
        }
      });
    }
  }

  formatStatusForDisplay(status: string): string {
    if (!status) return 'Pendente';
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }
}
