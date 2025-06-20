import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreIdeasListComponent } from './more-ideas-list.component';

describe('MoreIdeasListComponent', () => {
  let component: MoreIdeasListComponent;
  let fixture: ComponentFixture<MoreIdeasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreIdeasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreIdeasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
