import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GapAnalysisService, Goal } from '../services/gap-analysis.service';
import { combineLatest, BehaviorSubject, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

interface GapData {
  sector: string;
  monthlyData: {
    month: number;
    monthName: string;
    goal: number;
    realized: number;
    gap: number;
  }[];
  totalGoal: number;
  totalRealized: number;
  totalGap: number;
}

@Component({
  selector: 'app-gap-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gap-analysis.component.html',
  styleUrls: ['./gap-analysis.component.css']
})

export class GapAnalysisComponent implements OnInit {
  years: number[] = this.generateYears();
  selectedYear = new BehaviorSubject<number>(new Date().getFullYear());
  selectedMonthFilter = new BehaviorSubject<string>('all');

  gapData: GapData[] = [];
  tableSectors: string[] = [];
  tableMonths: { month: number, name: string }[] = this.getMonthNames();
  displayedMonths: { month: number, name: string }[] = [];

  isLoading = true;
  errorMessage = '';

  newGoal: Goal = { year: new Date().getFullYear(), month: 1, sector: '', goal: 0 };
  formSectors: string[] = ["Comercial", "Desenvolvimento", "Financeiro", "Marketing", "Produção", "Qualidade", "RH"];
  submitMessage = '';

  constructor(private gapAnalysisService: GapAnalysisService) {}

  ngOnInit(): void {
    combineLatest([this.selectedYear, this.selectedMonthFilter])
      .pipe(
        switchMap(([year, monthFilter]) => {
          this.isLoading = true;
          this.updateDisplayedMonths(monthFilter, year);
          return combineLatest({
            goals: this.gapAnalysisService.getGoals(year).pipe(catchError(() => of([]))),
            ideasCount: this.gapAnalysisService.getIdeasCount(year).pipe(catchError(() => of({})))
          });
        })
      )
      .subscribe(({ goals, ideasCount }) => {
        this.processData(goals, ideasCount);
        this.isLoading = false;
      });
  }

  private processData(goals: Goal[], ideasCount: any): void {
    const sectors = new Set<string>([...goals.map(g => g.sector), ...Object.keys(ideasCount), ...this.formSectors]);
    this.tableSectors = Array.from(sectors).sort();
    this.gapData = this.tableSectors.map(sector => {
        let totalGoal = 0;
        let totalRealized = 0;
        const monthlyData = this.tableMonths.map(monthInfo => {
            const goal = goals.find(g => g.sector === sector && g.month === monthInfo.month)?.goal || 0;
            const realized = ideasCount[sector]?.[monthInfo.month] || 0;
            if (this.isMonthDisplayed(monthInfo.month)) {
                totalGoal += goal;
                totalRealized += realized;
            }
            return {
                month: monthInfo.month,
                monthName: monthInfo.name,
                goal: goal,
                realized: realized,
                gap: realized - goal
            };
        });
        return { sector, monthlyData, totalGoal, totalRealized, totalGap: totalRealized - totalGoal };
    });
  }

  isMonthDisplayed(month: number): boolean {
    return this.displayedMonths.some(dm => dm.month === month);
  }

  onYearChange(year: number): void { this.selectedYear.next(year); }
  onMonthFilterChange(filter: string): void { this.selectedMonthFilter.next(filter); }

  private updateDisplayedMonths(filter: string, year: number): void {
    const currentMonth = new Date().getFullYear() === year ? new Date().getMonth() + 1 : 12;
    if (filter === 'current') {
      this.displayedMonths = this.tableMonths.slice(0, currentMonth);
    } else {
      this.displayedMonths = this.tableMonths;
    }
  }

  onSubmitGoal(): void {
    if (!this.newGoal.sector || this.newGoal.goal <= 0) {
      this.submitMessage = 'Por favor, preencha o setor e a meta corretamente.';
      return;
    }
    this.submitMessage = 'Enviando...';
    this.gapAnalysisService.setGoal(this.newGoal).subscribe({
      next: () => {
        this.submitMessage = 'Meta definida com sucesso!';
        this.selectedYear.next(this.newGoal.year);
        setTimeout(() => this.submitMessage = '', 3000);
      },
      error: () => { this.submitMessage = 'Erro ao definir a meta.'; }
    });
  }

  private generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 1; i >= 2023; i--) { years.push(i); }
    return years;
  }

  private getMonthNames(): { month: number, name: string }[] {
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      name: new Date(0, i).toLocaleString('pt-BR', { month: 'short' }).replace('.', '')
    }));
  }
}
