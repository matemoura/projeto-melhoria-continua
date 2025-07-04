import { Component, OnInit } from '@angular/core';
import { AuditService } from '../services/audit.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AuditDetailModalComponent } from '../audit-detail-modal/audit-detail-modal.component';
import { AuditHistoryEntry } from '../models/audit-history-entry.model';


@Component({
  selector: 'app-audit-history',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './audit-history.component.html',
  styleUrls: ['./audit-history.component.css']
})
export class AuditHistoryComponent implements OnInit {
  loading = true;
  loadingAudits = false;
  areas: string[] = [];
  selectedArea: string | null = null;
  auditHistory: AuditHistoryEntry[] = []; 

  constructor(private auditService: AuditService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.auditService.getAuditedAreas().subscribe({
      next: (data) => {
        this.areas = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadAuditsForArea(area: string): void {
    this.selectedArea = area;
    this.loadingAudits = true;
    this.auditHistory = [];
    
    this.auditService.getHistoryByArea(area).subscribe({
      next: (data) => {
        this.auditHistory = data.sort((a, b) => 
            new Date(b.auditDateTime).getTime() - new Date(a.auditDateTime).getTime()
        );
        this.loadingAudits = false;
      },
      error: () => {
        this.loadingAudits = false;
      }
    });
  }

  openDetails(audit: AuditHistoryEntry): void {
    this.dialog.open(AuditDetailModalComponent, {
      width: '800px', 
      data: audit 
    });
  }

  downloadEvidence(audit: AuditHistoryEntry): void {
    if (audit && audit.imageUrl) {
      this.auditService.downloadImage(audit.imageUrl).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          
          const filename = audit.imageUrl!.substring(audit.imageUrl!.lastIndexOf('/') + 1);
          link.download = filename || 'evidencia.jpg';
          
          document.body.appendChild(link);
          link.click();
          
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Falha ao baixar a imagem', err);
        }
      });
    } else {
      console.warn('Nenhuma imagem de evidência disponível para baixar.', audit);
    }
  }
}
