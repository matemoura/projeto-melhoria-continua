import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreIdeasService, MoreIdeaRaw } from '../services/more-ideas.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-ideas',
  templateUrl: './manage-ideas.component.html',
  styleUrls: ['./manage-ideas.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ManageIdeasComponent implements OnInit {
  ideas: MoreIdeaRaw[] = [];
  isLoading = true;
  loadError: string | null = null;
  isUpdating: { [key: number]: boolean } = {}; 

  statuses = ['PENDENTE', 'EM_ANALISE', 'APROVADA', 'REJEITADA', 'AGUARDANDO_A_IMPLEMENTACAO', 'IMPLEMENTADA'];

  constructor(private moreIdeasService: MoreIdeasService) { }

  ngOnInit(): void {
    this.loadIdeas();
  }

  loadIdeas(): void {
    this.isLoading = true;
    this.loadError = null;
    this.moreIdeasService.loadIdeas().subscribe({
      next: (data) => {
        this.ideas = data;
        this.isLoading = false;
      },
      error: () => {
        this.loadError = 'Falha ao carregar as ideias. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  onStatusChange(ideaId: number, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    this.isUpdating[ideaId] = true;

    this.moreIdeasService.updateIdeaStatus(ideaId, { status: newStatus }).subscribe({
      next: (updatedIdea) => {
        const index = this.ideas.findIndex(i => i.id === ideaId);
        if (index !== -1) {
          this.ideas[index].status = updatedIdea.status;
        }
        this.isUpdating[ideaId] = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Falha ao atualizar o status:', err);
        alert(`Ocorreu um erro ao salvar o novo status. Verifique o console do backend para mais detalhes (erro: ${err.status}).`);
        this.isUpdating[ideaId] = false;
        this.loadIdeas(); 
      }
    });
  }

  formatStatusForDisplay(status: string): string {
    if (!status) return 'PENDENTE';
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }
}
