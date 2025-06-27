import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoreIdeasService, MoreIdeaRaw } from '../services/more-ideas.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription, Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

interface MoreIdeaUI {
  id: number;
  nomeUsuario: string;
  emailUsuario?: string;
  setor: string;
  status: string;
  titulo: string; 
  descricaoProblema: string; 
  possiveisSolucoes?: string;
  impactos?: string[];
  interferencia?: number;
  expectativaMelhoria?: number;
  nomeKaizen?: string;
  imageUrl?: string;
  imageBlobUrl?: SafeUrl;
  originalFileName?: string;
  imageError?: string;
}

@Component({
  selector: 'app-more-ideas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './more-ideas-list.component.html',
  styleUrls: ['./more-ideas-list.component.css']
})
export class MoreIdeasListComponent implements OnInit, OnDestroy {
  ideas: MoreIdeaUI[] = [];
  isLoading = true;
  loadError = '';
  searchTerm: string = '';
  selectedStatus: string = '';

  private searchSubject = new Subject<string>();
  private statusSubject = new Subject<string>();

  statuses = ['PENDENTE', 'EM_ANALISE', 'APROVADA', 'REJEITADA', 'AGUARDANDO_A_IMPLEMENTACAO', 'IMPLEMENTADA'];

  private imageSubscriptions: Subscription[] = [];
  private backendUrl = 'http://localhost:8080';

  constructor(
    private moreIdeasService: MoreIdeasService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.searchSubject.pipe(startWith(''), debounceTime(300)),
      this.statusSubject.pipe(startWith(''))
    ]).pipe(
      distinctUntilChanged(),
      switchMap(([term, status]) => {
        this.isLoading = true;
        return this.moreIdeasService.loadIdeas(term, status);
      })
    ).subscribe({
      next: (rawIdeas: MoreIdeaRaw[]) => {
        this.ideas = rawIdeas.map(this.mapIdeaToUI.bind(this));
        this.loadImagesForIdeas();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.loadError = 'Erro ao carregar as ideias.';
        this.isLoading = false;
        console.error(err);
      }
    });

    this.onSearch();
  }

  ngOnDestroy(): void {
    this.imageSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
    this.statusSubject.next(this.selectedStatus);
  }

  formatStatusForDisplay(status: string): string {
    if (!status) return 'Pendente';
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  private mapIdeaToUI(item: MoreIdeaRaw): MoreIdeaUI {
    return {
      id: item.id,
      nomeUsuario: item.nomeUsuario,
      emailUsuario: item.emailUsuario,
      setor: item.setor,
      status: item.status,
      titulo: item.titulo,
      descricaoProblema: item.descricaoProblema,
      possiveisSolucoes: item.possiveisSolucoes,
      impactos: item.impactos,
      interferencia: item.interference,
      expectativaMelhoria: item.expectedImprovement,
      nomeKaizen: item.kaizenNameSuggestion,
      imageUrl: item.imageUrl,
      originalFileName: item.imageUrl ? item.imageUrl.split('/').pop() : 'imagem.png',
    };
  }

  loadImagesForIdeas(): void {
    this.ideas.forEach((idea) => {
      if (idea.imageUrl) {
        const fullImageUrl = `${this.backendUrl}${idea.imageUrl}`;
        const imageSub = this.moreIdeasService.getImage(fullImageUrl).subscribe({
          next: blob => {
            const objectUrl = URL.createObjectURL(blob);
            idea.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          },
          error: (err: any) => {
            console.error(`Falha ao carregar imagem ${idea.originalFileName}:`, err);
            idea.imageError = 'Não foi possível carregar a imagem.';
          }
        });
        this.imageSubscriptions.push(imageSub);
      }
    });
  }

  downloadImage(event: MouseEvent, idea: MoreIdeaUI): void {
    event.preventDefault();
    if (!idea.imageBlobUrl) return;

    const a = document.createElement('a');
    a.href = (idea.imageBlobUrl as any).changingThisBreaksApplicationSecurity;
    a.download = idea.originalFileName || 'imagem.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
