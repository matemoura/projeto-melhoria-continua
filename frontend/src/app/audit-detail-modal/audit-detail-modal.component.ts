import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-audit-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule
  ],
  templateUrl: './audit-detail-modal.component.html',
  styleUrls: ['./audit-detail-modal.component.css']
})
export class AuditDetailModalComponent {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(@Inject(MAT_DIALOG_DATA) public audit: any) {}

  get imageUrl(): string {
    if (this.audit && this.audit.imageUrl) {
      return `${this.baseUrl}${this.audit.imageUrl}`;
    }
    return 'assets/placeholder.png'; 
  }
}
