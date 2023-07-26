import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { DetailTeamComponent } from './detail-team/detail-team.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TeamsComponent, DetailTeamComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class TeamsModule {}
