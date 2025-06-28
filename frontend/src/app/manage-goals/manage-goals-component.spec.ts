import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGoalsComponent } from './manage-goals-component';

describe('ManageGoalsComponent', () => {
  let component: ManageGoalsComponent;
  let fixture: ComponentFixture<ManageGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
