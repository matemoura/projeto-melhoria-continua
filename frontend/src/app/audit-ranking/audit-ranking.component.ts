import { Component, OnInit } from '@angular/core';
import { AuditRankingService, AreaRanking } from '../services/audit-ranking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-ranking.component.html',
  styleUrls: ['./audit-ranking.component.css']
})
export class AuditRankingComponent implements OnInit {
  ranking: AreaRanking[] = [];
  tipoRanking: 'total' | 'latest' = 'total';
  loading = false;

  constructor(private rankingService: AuditRankingService) {}

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking() {
    this.loading = true;
    this.ranking = [];

    const observable = this.tipoRanking === 'total' ?
      this.rankingService.getTotalRanking() :
      this.rankingService.getLatestAuditRanking();

    observable.subscribe({
      next: (data) => {
        this.ranking = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar ranking:', err);
        this.loading = false;
      }
    });
  }

  onTipoRankingChange(tipo: 'total' | 'latest') {
    this.tipoRanking = tipo;
    this.loadRanking();
  }
}
