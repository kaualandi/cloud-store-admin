import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ITeams } from '../models/teams';
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

    return this.http.get<IPagedReq<ITeams>>('teams', params);
  }

  postTeams(team: ITeams) {
    const body = {
      name: team.name,
      email: team.url,
    };

    return this.http.post<ITeams[]>(`teams/`, body);
  }

  patchTeams(id: number, team: ITeams) {
    const body = {
      name: team.name,
      email: team.url,
    };
    return this.http.patch<ITeams[]>(`teams/${id}`, body);
  }

  deletTeams(id: number) {
    return this.http.delete<ITeams[]>(`teams/${id}`);
  }
}
