import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditsComponent } from './user-edits.component';

describe('UserEditsComponent', () => {
  let component: UserEditsComponent;
  let fixture: ComponentFixture<UserEditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
