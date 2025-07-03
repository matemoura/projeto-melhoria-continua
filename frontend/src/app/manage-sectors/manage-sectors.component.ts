import { Component, OnInit } from '@angular/core';
import { SectorService } from '../services/sector.service';
import { Sector } from '../models/sector.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-sectors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-sectors.component.html',
  styleUrls: ['./manage-sectors.component.css']
})
export class ManageSectorsComponent implements OnInit {
  sectors: Sector[] = [];
  newSectorName: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private sectorService: SectorService) { }

  ngOnInit(): void {
    this.sectorService.sectors$.subscribe((data: Sector[]) => {
      this.sectors = data;
    });
  }

  createSector(): void {
    if (!this.newSectorName.trim()) {
      this.showMessage('O nome do setor não pode ser vazio.', true);
      return;
    }
    this.sectorService.createSector({ name: this.newSectorName }).subscribe({
      next: () => {
        this.showMessage('Setor criado com sucesso!', false);
        this.newSectorName = '';
      },
      error: (err) => {
        this.showMessage('Erro ao criar setor. Talvez já exista.', true);
        console.error(err);
      }
    });
  }

  deleteSector(id: number): void {
    if (confirm('Tem certeza que deseja excluir este setor?')) {
      this.sectorService.deleteSector(id).subscribe({
        next: () => {
          this.showMessage('Setor excluído com sucesso!', false);
        },
        error: (err) => {
          this.showMessage('Erro ao excluir setor. Verifique se ele não está em uso.', true);
          console.error(err);
        }
      });
    }
  }
  
  private showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
    setTimeout(() => this.message = '', 3000);
  }
}
