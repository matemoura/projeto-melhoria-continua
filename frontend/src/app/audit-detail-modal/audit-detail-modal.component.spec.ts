import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDetailModalComponent } from './audit-detail-modal.component';

describe('AuditDetailModalComponent', () => {
  let component: AuditDetailModalComponent;
  let fixture: ComponentFixture<AuditDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
