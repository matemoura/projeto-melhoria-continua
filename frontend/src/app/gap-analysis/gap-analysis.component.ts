import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GapAnalysisService, GapData } from '../services/gap-analysis.service';

interface MonthDisplay {
  id: number;
  name: string;
}

@Component({
  selector: 'app-gap-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gap-analysis.component.html',
  styleUrls: ['./gap-analysis.component.css']
})
export class GapAnalysisComponent implements OnInit {

  private gapAnalysisService = inject(GapAnalysisService);

  isLoading = false;
  errorMessage = '';
  hasSearched = false;

  gapData: GapData[] = [];
  searchYear: number = new Date().getFullYear();
  
  isCurrentYear = false;
  filterUpToCurrentMonth = true;
  readonly currentMonth = new Date().getMonth() + 1; 

  allMonths: MonthDisplay[] = [
    { id: 1, name: 'Jan' }, { id: 2, name: 'Fev' }, { id: 3, name: 'Mar' },
    { id: 4, name: 'Abr' }, { id: 5, name: 'Mai' }, { id: 6, name: 'Jun' },
    { id: 7, name: 'Jul' }, { id: 8, name: 'Ago' }, { id: 9, name: 'Set' },
    { id: 10, name: 'Out' }, { id: 11, name: 'Nov' }, { id: 12, name: 'Dez' }
  ];

  private originalGapData: GapData[] = [];

  ngOnInit(): void {
  }

  onSearch(): void {
    if (!this.searchYear) {
      this.errorMessage = 'Por favor, insira um ano válido.';
      return;
    }

    this.isLoading = true;
    this.hasSearched = true;
    this.errorMessage = '';
    this.gapData = [];

    this.isCurrentYear = (this.searchYear === new Date().getFullYear());
    if (this.isCurrentYear) {
        this.filterUpToCurrentMonth = true;
    }

    this.gapAnalysisService.getGapAnalysisData(this.searchYear).subscribe({
      next: (data) => {
        this.originalGapData = JSON.parse(JSON.stringify(data)); // Cópia profunda dos dados
        this.updateGapDataTotals();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Falha ao carregar os dados. O serviço pode estar indisponível ou não há dados para este ano.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  
  onFilterChange(): void {
    this.updateGapDataTotals();
  }

  private updateGapDataTotals(): void {
    if (!this.originalGapData) return;

    this.gapData = this.originalGapData.map(data => {
      const monthlyDataToSum = this.isCurrentYear && this.filterUpToCurrentMonth
        ? data.monthlyData.slice(0, this.currentMonth)
        : data.monthlyData;
        
      const totalGoal = monthlyDataToSum.reduce((acc, month) => acc + month.goal, 0);
      const totalRealized = monthlyDataToSum.reduce((acc, month) => acc + month.realized, 0);

      return {
        ...data,
        totalGoal,
        totalRealized,
        totalGap: totalRealized - totalGoal
      };
    });
  }
}
