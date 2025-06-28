import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreIdeasService, MoreIdeaRaw, UpdateMoreIdeaPayload } from '../services/more-ideas.service';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

interface ManagedIdea {
  id: number;
  nomeUsuario: string;
  setor: string;
  kaizenNameSuggestion?: string;
  kaizenName: string; 
  status: string;
}

@Component({
  selector: 'app-manage-ideas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-ideas.component.html',
  styleUrls: ['./manage-ideas.component.css']
})
export class ManageIdeasComponent implements OnInit, OnDestroy {
  ideas: ManagedIdea[] = [];
  statuses = ['PENDENTE', 'EM_ANALISE', 'APROVADA', 'REJEITADA', 'AGUARDANDO_A_IMPLEMENTACAO', 'IMPLEMENTADA'];
  isLoading = true;
  error = '';

  searchTerm: string = '';
  selectedStatus: string = '';
  private searchSubject = new Subject<string>();
  private statusSubject = new Subject<string>();
  private combinedSubscription!: Subscription;

  constructor(private moreIdeasService: MoreIdeasService) { }

  ngOnInit(): void {
    this.combinedSubscription = combineLatest([
      this.searchSubject.pipe(startWith(''), debounceTime(300)),
      this.statusSubject.pipe(startWith(''))
    ]).pipe(
      distinctUntilChanged(),
      switchMap(([term, status]) => {
        this.isLoading = true;
        return this.moreIdeasService.getIdeas(term, status);
      })
    ).subscribe({
      next: (data: MoreIdeaRaw[]) => {
        this.ideas = data.map(idea => ({
          id: idea.id,
          nomeUsuario: idea.nomeUsuario,
          setor: idea.setor,
          kaizenNameSuggestion: idea.kaizenNameSuggestion,
          kaizenName: idea.kaizenName || '', 
          status: idea.status,
        }));
        this.isLoading = false;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Falha ao carregar as ideias. Tente novamente mais tarde.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.combinedSubscription) {
      this.combinedSubscription.unsubscribe();
    }
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
    this.statusSubject.next(this.selectedStatus);
  }

  updateIdea(idea: ManagedIdea): void {
    const payload: UpdateMoreIdeaPayload = {
      status: idea.status,
      kaizenName: idea.kaizenName
    };

    this.moreIdeasService.updateIdea(idea.id, payload).subscribe({
      next: (updatedIdea) => {
        alert(`Ideia #${idea.id} salva com sucesso!`);
        idea.status = updatedIdea.status;
        idea.kaizenName = updatedIdea.kaizenName || '';
      },
      error: (err) => {
        console.error('Falha ao atualizar a ideia', err);
        alert('Erro ao salvar. As alterações não foram aplicadas.');
        this.onSearchChange(); 
      }
    });
  }

  formatStatusForDisplay(status: string): string {
    if (!status) return 'Pendente';
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }
}
