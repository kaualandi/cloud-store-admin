import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPagedReq } from '../models/utils';
import { ISection } from '../models/section';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(private http: HttpService) {}

  getSections(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', environment.page_size);

    return this.http.get<IPagedReq<ISection>>('sections', params);
  }

  postSection(section: ISection) {
    const body = {
      name: section.name,
    };

    return this.http.post<ISection[]>(`sections/`, body);
  }

  patchSection(id: number, section: ISection) {
    const body = {
      name: section.name,
    };
    return this.http.patch<ISection[]>(`sections/${id}`, body);
  }

  deleteSection(id: number) {
    return this.http.delete<ISection[]>(`sections/${id}`);
  }
}
