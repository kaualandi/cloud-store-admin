import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTeamComponent } from './detail-team.component';

describe('DetailTeamComponent', () => {
  let component: DetailTeamComponent;
  let fixture: ComponentFixture<DetailTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
