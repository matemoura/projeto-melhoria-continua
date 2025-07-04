import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { AuditRankingService, AreaRanking } from '../services/audit-ranking.service';
import { AuditService } from '../services/audit.service';
import { AuthService } from '../services/auth.service';
import { AuditHistoryEntry } from '../models/audit-history-entry.model';

Chart.register(...registerables);

@Component({
  selector: 'app-audit-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-ranking.component.html',
  styleUrls: ['./audit-ranking.component.css']
})
export class AuditRankingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rankingChart') private chartRef!: ElementRef;
  private chart?: Chart;

  ranking: AreaRanking[] = [];
  tipoRanking: 'total' | 'latest' = 'total';
  loading = false;
  selectedArea: string | null = null;
  areaHistory: AuditHistoryEntry[] = [];
  loadingHistory = false;
  selectedAudit: any | null = null;

  private colorPalette: string[] = [
    '#3f51b5', '#e91e63', '#ff9800', '#4caf50', '#00bcd4',
    '#9c27b0', '#f44336', '#cddc39', '#795548', '#607d8b'
  ];

  constructor(
    private rankingService: AuditRankingService,
    private auditService: AuditService, 
    public authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.loadRanking();
  }
  
  ngAfterViewInit(): void {
    if (this.ranking.length > 0) {
        this.renderChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  loadRanking() {
    this.loading = true;
    this.ranking = [];
    this.selectedArea = null;

    const observable = this.tipoRanking === 'total' 
      ? this.rankingService.getTotalRanking()
      : this.rankingService.getLatestAuditRanking();

    observable.subscribe({
      next: (data) => {
        this.ranking = data;
        this.loading = false;
        setTimeout(() => this.renderChart(), 0);
      },
      error: (err) => {
        console.error('Erro ao carregar ranking:', err);
        this.loading = false;
      }
    });
  }

  onTipoRankingChange(type: 'total' | 'latest'): void {
    this.tipoRanking = type;
    this.selectedArea = null;
    this.areaHistory = []; 
    this.loadRanking();
  }

  renderChart() {
    if (!this.chartRef || this.ranking.length === 0) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.ranking.map(item => item.nomeArea);
    const data = this.ranking.map(item => item.pontuacao);

    const backgroundColors = this.ranking.map(
        (_, index) => this.colorPalette[index % this.colorPalette.length]
    );

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pontuação',
          data: data,
          backgroundColor: backgroundColors, 
          borderColor: backgroundColors,
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.formattedValue} pontos`
            }
          }
        }
      }
    });
  }
  
  selectArea(areaName: string): void {
    if (this.tipoRanking !== 'total') {
      return;
    }

    this.selectedArea = areaName;
    this.loadingHistory = true;
    this.areaHistory = []; 

    this.auditService.getHistoryByArea(areaName).subscribe({
      next: (history: AuditHistoryEntry[]) => { 
        this.areaHistory = history; 
        this.loadingHistory = false;
      },
      error: (err: any) => {
        console.error('Failed to load audit history', err);
        this.loadingHistory = false;
      }
    });
  }

  viewAuditDetails(audit: AuditHistoryEntry) { 
    this.selectedAudit = audit; 
  }
  
  closeModal() {
    this.selectedAudit = null;
  }

  exportToExcel(): void {
    const dataToExport = this.ranking.map(item => ({
      'Área': item.nomeArea,
      'Pontuação': item.pontuacao
    }));
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, `ranking_${this.tipoRanking}_${new Date().toLocaleDateString()}.xlsx`);
  }
}