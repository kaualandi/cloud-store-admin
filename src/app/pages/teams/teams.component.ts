import { DetailTeamComponent } from './detail-team/detail-team.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from 'src/app/services/teams.service';
import { ITeam } from 'src/app/models/teams';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/components/modals/message/message.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  constructor(private teamsService: TeamsService, private dialog: MatDialog) {}

  loading = false;

  displayedColumns: string[] = ['image', 'name', 'created_at', 'actions'];
  dataSource: ITeam[] = [];
  page = 1;
  next = false;
  prev = false;
  total_page = 1;

  ngOnInit(): void {
    this.getTeams(1);
  }

  getTeams(page: number) {
    this.loading = true;
    this.teamsService.getTeams(page).subscribe({
      next: (data) => {
        this.dataSource = data.results;
        this.page = page;
        this.next = !!data.next;
        this.prev = !!data.previous;
        this.total_page = Math.ceil(data.count / environment.page_size) || 1;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  detailTeam(data?: ITeam) {
    const dialogRef = this.dialog.open(DetailTeamComponent, { data });
    dialogRef.afterClosed().subscribe((result: ITeam | undefined) => {
      if (!result) return;

      if (result.id) {
        this.updateTeam(result);
        return;
      }

      this.createTeam(result);
    });
  }

  createTeam(data: ITeam) {
    this.loading = true;
    this.teamsService.postTeam(data).subscribe({
      next: () => {
        this.getTeams(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateTeam(data: ITeam) {
    this.loading = true;
    this.teamsService.patchTeam(data.id, data).subscribe({
      next: () => {
        this.getTeams(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  confirmDelete(data: ITeam) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: { message: `Deseja realmente excluir ${data.name}?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteTeam(data);
    });
  }

  deleteTeam(data: ITeam) {
    this.loading = true;
    this.teamsService.deleteTeam(data.id).subscribe({
      next: () => {
        this.getTeams(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
