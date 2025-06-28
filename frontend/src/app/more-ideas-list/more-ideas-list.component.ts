import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreIdeasService, MoreIdeaRaw } from '../services/more-ideas.service';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface IdeaUI {
  id: number;
  nomeUsuario: string;
  emailUsuario?: string;
  setor: string;
  descricaoProblema: string;
  possiveisSolucoes?: string;
  kaizenNameSuggestion?: string;
  kaizenName?: string;
  nomeKaizen?: string; 
  status: string;
  imageUrl?: string;
  imageBlobUrl?: SafeUrl;
  imageError?: string;
  impactos?: string[];
  interferencia?: number;
  expectativaMelhoria?: number;
  createdAt: string;
}

@Component({
  selector: 'app-more-ideas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './more-ideas-list.component.html',
  styleUrls: ['./more-ideas-list.component.css']
})
export class MoreIdeasListComponent implements OnInit, OnDestroy {
  ideas: IdeaUI[] = [];
  statuses = ['PENDENTE', 'EM_ANALISE', 'APROVADA', 'REJEITADA', 'AGUARDANDO_A_IMPLEMENTACAO', 'IMPLEMENTADA'];
  isLoading = true;
  loadError = '';

  searchTerm: string = '';
  selectedStatus: string = '';
  
  private searchSubject = new Subject<string>();
  private statusSubject = new Subject<string>();
  private ideasSubscription!: Subscription;

  constructor(
    private moreIdeasService: MoreIdeasService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.ideasSubscription = combineLatest([
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
          ...idea,
          nomeKaizen: idea.kaizenNameSuggestion, 
          expectativaMelhoria: idea.expectedImprovement
        }));
        this.isLoading = false;
        this.loadError = '';
        this.loadImages();
      },
      error: (err) => {
        this.loadError = 'Falha ao carregar as ideias. Tente novamente mais tarde.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ideasSubscription) {
      this.ideasSubscription.unsubscribe();
    }
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
    this.statusSubject.next(this.selectedStatus);
  }

  loadImages(): void {
    this.ideas.forEach(idea => {
      if (idea.imageUrl && !idea.imageBlobUrl) {
        this.moreIdeasService.getImage(idea.imageUrl).subscribe({
          next: (blob) => {
            const objectUrl = URL.createObjectURL(blob);
            idea.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          },
          error: () => {
            idea.imageError = 'Não foi possível carregar a imagem.';
          }
        });
      }
    });
  }

  downloadImage(event: Event, idea: IdeaUI): void {
    event.preventDefault();
  }

  formatStatusForDisplay(status: string): string {
    if (!status) return 'Pendente';
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }
}
