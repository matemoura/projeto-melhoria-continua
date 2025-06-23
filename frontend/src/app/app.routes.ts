import { Routes } from '@angular/router';
import { MoreIdeasFormComponent } from './more-ideas-form/more-ideas-form.component';
import { MoreIdeasListComponent } from './more-ideas-list/more-ideas-list.component';
import { AuditFormComponent } from './audit-form/audit-form.component';
import { AuditRankingComponent } from './audit-ranking/audit-ranking.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'more-ideas/new', component: MoreIdeasFormComponent }, 
  { path: 'more-ideas/list', component: MoreIdeasListComponent },
  { path: 'audit/new', component: AuditFormComponent },          
  { path: 'audit/ranking', component: AuditRankingComponent },
  { path: '**', redirectTo: '' }
];