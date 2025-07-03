import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GapAnalysisService, Goal } from '../services/gap-analysis.service';
import { Sector } from '../models/sector.model';
import { SectorService } from '../services/sector.service';

@Component({
  selector: 'app-manage-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-goals-component.html',
  styleUrls: ['./manage-goals-component.css']
})
export class ManageGoalsComponent implements OnInit {
  gapAnalysisService = inject(GapAnalysisService);

  private sectorService = inject(SectorService);

  newGoal: Goal = { year: new Date().getFullYear(), month: 1, sector: '', goal: 0 };

  years: number[] = this.generateYears();
  months = [
    { value: 1, name: 'Janeiro' }, { value: 2, name: 'Fevereiro' },
    { value: 3, name: 'Março' }, { value: 4, name: 'Abril' },
    { value: 5, name: 'Maio' }, { value: 6, name: 'Junho' },
    { value: 7, name: 'Julho' }, { value: 8, name: 'Agosto' },
    { value: 9, name: 'Setembro' }, { value: 10, name: 'Outubro' },
    { value: 11, name: 'Novembro' }, { value: 12, name: 'Dezembro' }
  ];
  
  formSectors: Sector[] = [];
  submitMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.loadSectors();
  }

  loadSectors(): void {
    this.sectorService.sectors$.subscribe((data: Sector[]) => {
      this.formSectors = data;
    });
  }

  onSubmitGoal(): void {
    if (!this.newGoal.sector || this.newGoal.goal <= 0) {
      this.submitMessage = 'Erro: Por favor, preencha o setor e uma meta maior que zero.';
      return;
    }
    this.isLoading = true;
    this.submitMessage = 'Enviando...';

    this.gapAnalysisService.setGoal(this.newGoal).subscribe({
      next: () => {
        this.submitMessage = `Meta de ${this.newGoal.goal} ideias para ${this.newGoal.sector} em ${this.newGoal.month}/${this.newGoal.year} definida com sucesso!`;
        this.isLoading = false;
        this.newGoal.goal = 0;
      },
      error: (err) => {
        this.submitMessage = 'Erro ao definir a meta. Verifique se está autenticado.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  private generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 1; i >= 2023; i--) { years.push(i); }
    return years;
  }
}
