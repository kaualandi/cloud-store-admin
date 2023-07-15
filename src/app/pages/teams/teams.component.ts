import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from 'src/app/services/teams.service';
import { ITeams } from 'src/app/models/teams';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  constructor(private teamsService: TeamsService) {}

  loading = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: ITeams[] = [];
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
        this.loading = false;
        console.log(data);

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

  openPopupDelet(team: ITeams) {
    this.deletTeams(team);
  }

  deletTeams(team: ITeams) {
    this.loading = true;
    this.teamsService.deletTeams(team.id).subscribe({
      next: (data) => {
        console.log(data);
        this.getTeams(1);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
