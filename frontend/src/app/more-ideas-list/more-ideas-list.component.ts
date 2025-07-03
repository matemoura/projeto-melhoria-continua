import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreIdeasService, MoreIdeaRaw } from '../services/more-ideas.service';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { AuthService } from '../services/auth.service';

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

  private readonly backendUrl = 'http://localhost:8080';
  private imageBlobs: Map<number, Blob> = new Map();

  constructor(
    private moreIdeasService: MoreIdeasService,
    private sanitizer: DomSanitizer,
    public authService: AuthService
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
          expectativaMelhoria: idea.expectedImprovement,
          interferencia: idea.interference
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
        const fullImageUrl = `${this.backendUrl}${idea.imageUrl}`;
        this.moreIdeasService.getImage(fullImageUrl).subscribe({
          next: (blob) => {
            this.imageBlobs.set(idea.id, blob); 
            
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

  downloadImage(event: MouseEvent, idea: IdeaUI): void {
    event.preventDefault(); 
    
    const blob = this.imageBlobs.get(idea.id);
    
    if (blob && idea.imageUrl) {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = idea.imageUrl.split('/').pop() || 'anexo'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    }
  }

  formatStatusForDisplay(status: string): string {
    if (!status) return 'Pendente';
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ideas.map(idea => {
      return {
        'ID': idea.id,
        'Usuário': idea.nomeUsuario,
        'E-mail': idea.emailUsuario,
        'Setor': idea.setor,
        'Status': this.formatStatusForDisplay(idea.status),
        'Problema': idea.descricaoProblema,
        'Soluções Sugeridas': idea.possiveisSolucoes,
        'Interferência nas Atividades': idea.interferencia,
        'Expectativa de Melhoria': idea.expectativaMelhoria,
        'Sugestão Kaizen': idea.kaizenNameSuggestion,
        'Nome Oficial Kaizen': idea.kaizenName,
        'Impactos': idea.impactos?.join(', '),
        'Data de Envio': new Date(idea.createdAt).toLocaleDateString()
      };
    }));
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'lista_de_ideias');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = `${fileName}_${new Date().getTime()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
