import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoreIdeasService, MoreIdeaRaw } from '../services/more-ideas.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

interface MoreIdeaUI {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  setor: string;
  descricaoProblema: string;
  possiveisSolucoes: string;
  impactos: string[];
  interferencia: number;
  expectativaMelhoria: number;
  nomeKaizen?: string;
  imageUrl?: string;
  imageBlobUrl?: SafeUrl;
  originalFileName?: string;
  imageError?: string;
  status: string;
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
  private searchSubject = new Subject<string>();

  private imageSubscriptions: Subscription[] = [];
  private backendUrl = 'http://localhost:8080';

  constructor(
    private moreIdeasService: MoreIdeasService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.isLoading = true;
        return this.moreIdeasService.loadIdeas(term);
      })
    ).subscribe({
      next: (rawIdeas: MoreIdeaRaw[]) => {
        this.ideas = rawIdeas.map(this.mapIdeaToUI);
        this.loadImagesForIdeas();
        this.isLoading = false;
      },
      error: err => {
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
  }

  private mapIdeaToUI(item: MoreIdeaRaw): MoreIdeaUI {
    return {
      id: item.id,
      nomeUsuario: item.nomeUsuario,
      emailUsuario: item.emailUsuario,
      setor: item.setor,
      descricaoProblema: item.descricaoProblema,
      possiveisSolucoes: item.possiveisSolucoes,
      impactos: item.impactos,
      interferencia: item.interference,
      expectativaMelhoria: item.expectedImprovement,
      nomeKaizen: item.kaizenNameSuggestion,
      imageUrl: item.imageUrl,
      originalFileName: item.imageUrl ? item.imageUrl.split('/').pop() : 'imagem.png',
      status: item.status,
    };
  }

  loadImagesForIdeas(): void {
    this.ideas.forEach((idea) => {
      if (idea.imageUrl) {
        const fullImageUrl = `<span class="math-inline">\{this\.backendUrl\}</span>{idea.imageUrl}`;
        const imageSub = this.moreIdeasService.getImage(fullImageUrl).subscribe({
          next: blob => {
            const objectUrl = URL.createObjectURL(blob);
            idea.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          },
          error: err => {
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
