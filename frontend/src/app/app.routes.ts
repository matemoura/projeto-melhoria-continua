import { Routes } from '@angular/router';
import { MoreIdeasFormComponent } from './more-ideas-form/more-ideas-form.component';
import { MoreIdeasListComponent } from './more-ideas-list/more-ideas-list.component';
import { ManageIdeasComponent } from './manage-ideas/manage-ideas.component';
import { AuditFormComponent } from './audit-form/audit-form.component';
import { AuditRankingComponent } from './audit-ranking/audit-ranking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { GapAnalysisComponent } from './gap-analysis/gap-analysis.component.spec';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'more-ideas/new', component: MoreIdeasFormComponent },
  { path: 'more-ideas/list', component: MoreIdeasListComponent },
  { path: 'manage-ideas', component: ManageIdeasComponent, canActivate: [authGuard] },
  { path: 'gap-analysis', component: GapAnalysisComponent },
  { path: 'audit/new', component: AuditFormComponent , canActivate: [authGuard] },
  { path: 'audit/ranking', component: AuditRankingComponent },
  { path: '**', redirectTo: '/home' }
];
