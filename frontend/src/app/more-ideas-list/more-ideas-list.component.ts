import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreIdeasService, MoreIdeaRaw } from '../services/more-ideas.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

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
  imports: [CommonModule],
  templateUrl: './more-ideas-list.component.html',
  styleUrls: ['./more-ideas-list.component.css']
})
export class MoreIdeasListComponent implements OnInit, OnDestroy {
  ideas: MoreIdeaUI[] = [];
  isLoading = true;
  loadError = '';

  private imageSubscriptions: Subscription[] = [];
  private backendUrl = 'http://localhost:8080';

  constructor(
    private moreIdeasService: MoreIdeasService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const ideasSub = this.moreIdeasService.loadIdeas().subscribe({
      next: (rawIdeas: MoreIdeaRaw[]) => {
        this.ideas = rawIdeas.map((item) => ({
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
        }));
        this.loadImagesForIdeas();
        this.isLoading = false;
      },
      error: (err) => {
        this.loadError = 'Erro ao carregar as ideias.';
        this.isLoading = false;
        console.error(err);
      }
    });
    this.imageSubscriptions.push(ideasSub);
  }

  ngOnDestroy(): void {
    this.imageSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
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
