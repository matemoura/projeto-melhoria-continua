import { Routes } from '@angular/router';
import { MoreIdeasFormComponent } from './more-ideas-form/more-ideas-form.component';
import { MoreIdeasListComponent } from './more-ideas-list/more-ideas-list.component';
import { ManageIdeasComponent } from './manage-ideas/manage-ideas.component';
import { AuditFormComponent } from './audit-form/audit-form.component';
import { AuditRankingComponent } from './audit-ranking/audit-ranking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { GapAnalysisComponent } from './gap-analysis/gap-analysis.component';
import { ManageGoalsComponent } from './manage-goals/manage-goals-component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ManageSectorsComponent } from './manage-sectors/manage-sectors.component';
import { AuditHistoryComponent } from './audit-history/audit-history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'more-ideas/new', component: MoreIdeasFormComponent },
  { path: 'more-ideas/list', component: MoreIdeasListComponent },
  {
    path: 'manage-ideas',
    component: ManageIdeasComponent,
    canActivate: [authGuard],
    data: { roles: ['melhoria continua', 'admin'] }
  },
  { path: 'gap-analysis', component: GapAnalysisComponent },
  {
    path: 'manage-goals',
    component: ManageGoalsComponent,
    canActivate: [authGuard],
    data: { roles: ['melhoria continua', 'admin'] }
  },
  {
    path: 'audit/new',
    component: AuditFormComponent,
    canActivate: [authGuard],
    data: { roles: ['comitê do 5S', 'melhoria continua', 'admin'] }
  },
  { path: 'audit/ranking', component: AuditRankingComponent },
  {
    path: 'audit/history',
    component: AuditHistoryComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN', 'MELHORIA_CONTINUA', 'COMITE_5S'] }
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'manage-sectors',
    component: ManageSectorsComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'melhoria continua'] }
  },
  { path: '**', redirectTo: '/home' }
];
