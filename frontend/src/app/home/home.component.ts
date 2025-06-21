import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Bem-vindo à Plataforma de Melhoria Contínua!</h2>
    <nav>
      <ul>
        <li><a routerLink="/more-ideas/new">Enviar Nova Ideia</a></li>
        <li><a routerLink="/more-ideas/list">Ver Ideias</a></li>
        <li><a routerLink="/audit/new">Realizar Auditoria 5S</a></li>
        <li><a routerLink="/audit/ranking">Ver Ranking 5S</a></li>
      </ul>
    </nav>
  `,
  styles: `
    /* Adicione algum estilo básico para sua página inicial */
    nav ul {
      list-style-type: none;
      padding: 0;
    }
    nav li {
      margin: 0.5em 0;
    }
    nav a {
      text-decoration: none;
      color: #007bff;
    }
  `
})
export class HomeComponent { }
