import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ITeam } from '../models/teams';
import { HttpParams } from '@angular/common/http';
import { IPagedReq } from '../models/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpService) {}

  getTeams(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', environment.page_size);

    return this.http.get<IPagedReq<ITeam>>('teams', params);
  }

  postTeam(team: ITeam) {
    const body = {
      name: team.name,
      url: team.url,
    };

    return this.http.post<ITeam[]>(`teams/`, body);
  }

  patchTeam(id: number, team: ITeam) {
    const body = {
      name: team.name,
      url: team.url,
    };
    return this.http.patch<ITeam[]>(`teams/${id}`, body);
  }

  deleteTeam(id: number) {
    return this.http.delete<ITeam[]>(`teams/${id}`);
  }
}
