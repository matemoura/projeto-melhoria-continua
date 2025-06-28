import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  profiles: string[] = ['admin', 'comitê do 5S', 'melhoria continua', 'user'];
  selectedProfile: { [key: number]: string } = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.users.forEach(user => {
          this.selectedProfile[user.id] = user.profile;
        });
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os usuários.';
        console.error(err);
      }
    });
  }

  updateProfile(userId: number): void {
    const newProfile = this.selectedProfile[userId];
    if (newProfile) {
      this.userService.updateUserProfile(userId, newProfile).subscribe({
        next: () => {
          this.successMessage = 'Perfil do usuário atualizado com sucesso!';
          this.errorMessage = '';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadUsers();
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar o perfil.';
          this.successMessage = '';
          console.error(err);
        }
      });
    }
  }
}
