import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MoreIdeasFormComponent } from './more-ideas-form/more-ideas-form.component';
import { MoreIdeasListComponent } from './more-ideas-list/more-ideas-list.component';
import { AuditFormComponent } from './audit-form/audit-form.component';
import { AuditRankingComponent } from './audit-ranking/audit-ranking.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoreIdeasFormComponent,
    MoreIdeasListComponent,
    AuditFormComponent,
    AuditRankingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
