import { Component, OnInit } from '@angular/core';
import { UserService, UserUpdateRequest } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sector } from '../models/sector.model';
import { SectorService } from '../services/sector.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  profiles: string[] = ['ADMIN', 'COMITE_5S', 'MELHORIA_CONTINUA', 'USER'];
  availableSectors: Sector[] = [];
  selectedProfile: { [key: number]: string } = {};
  selectedSectorId: { [key: number]: number | null } = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private sectorService: SectorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadSectors();
  }

  loadSectors(): void {
    this.sectorService.sectors$.subscribe({
      next: (data: Sector[]) => {
        this.availableSectors = data;
      },
      error: (err) => {
        console.error('Falha ao carregar setores:', err);
        this.errorMessage = 'Não foi possível carregar a lista de setores.';
      }
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.users.forEach(user => {
          this.selectedProfile[user.id] = user.profile;
          this.selectedSectorId[user.id] = user.sector ? user.sector.id : null;
        });
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os usuários.';
        console.error(err);
      }
    });
  }

  updateUser(user: User): void {
    const payload: UserUpdateRequest = {
      profile: this.selectedProfile[user.id],
      setorId: this.selectedSectorId[user.id]
    };

    this.successMessage = '';
    this.errorMessage = '';

    this.userService.updateUser(user.id, payload).subscribe({
      next: () => {
        this.successMessage = 'Usuário atualizado com sucesso!';
        setTimeout(() => this.successMessage = '', 3000);
        this.loadUsers();
      },
      error: (err) => {
        console.error('Erro detalhado ao atualizar:', err);
        if (err.status === 403) {
          this.errorMessage = 'Permissão negada. Você não tem o perfil necessário para esta ação.';
        } else {
          this.errorMessage = 'Erro ao atualizar o usuário. Verifique os dados e tente novamente.';
        }
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }
}
