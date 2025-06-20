import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreIdeasFormComponent } from './more-ideas-form.component';

describe('MoreIdeasFormComponent', () => {
  let component: MoreIdeasFormComponent;
  let fixture: ComponentFixture<MoreIdeasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreIdeasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreIdeasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
