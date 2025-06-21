import { Component, OnInit } from '@angular/core';
import { AuditRankingService, AreaRanking } from '../services/audit-ranking.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-audit-ranking',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './audit-ranking.component.html',
  styleUrls: ['./audit-ranking.component.css']
})
export class AuditRankingComponent implements OnInit {
  ranking: AreaRanking[] = [];
  tipoRanking: 'total' | 'latest' = 'total';

  constructor(private rankingService: AuditRankingService) {}

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking() {
    if (this.tipoRanking === 'total') {
      this.rankingService.getTotalRanking().subscribe({
        next: (data) => this.ranking = data,
        error: (err) => console.error('Erro ao carregar ranking total', err)
      });
    } else {
      this.rankingService.getLatestAuditRanking().subscribe({
        next: (data) => this.ranking = data,
        error: (err) => console.error('Erro ao carregar ranking da última auditoria', err)
      });
    }
  }

  onTipoRankingChange(tipo: 'total' | 'latest') {
    this.tipoRanking = tipo;
    this.loadRanking();
  }
}
