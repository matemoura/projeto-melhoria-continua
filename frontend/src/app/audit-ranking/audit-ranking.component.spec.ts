import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditRankingComponent } from './audit-ranking.component';

describe('AuditRankingComponent', () => {
  let component: AuditRankingComponent;
  let fixture: ComponentFixture<AuditRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
