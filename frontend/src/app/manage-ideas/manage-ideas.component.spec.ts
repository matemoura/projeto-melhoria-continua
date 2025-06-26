import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIdeasComponent } from './manage-ideas.component';

describe('ManageIdeasComponent', () => {
  let component: ManageIdeasComponent;
  let fixture: ComponentFixture<ManageIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageIdeasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
