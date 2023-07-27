import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPagedReq } from '../models/utils';
import { IFilter } from '../models/filters';
import { ICategory } from '../models/categorys';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpService) {}

  getFilters(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', environment.page_size);

    return this.http.get<IPagedReq<IFilter>>('filters', params);
  }

  getCategorysSelect() {
    const params = new HttpParams().set('page', 1).set('page_size', 2000);

    return this.http.get<IPagedReq<ICategory>>('categorys', params);
  }

  postFilter(category: IFilter) {
    const body = {
      name: category.name,
      category_id: category.category_id,
    };

    return this.http.post<IFilter[]>(`filters/`, body);
  }

  patchFilter(id: number, category: IFilter) {
    const body = {
      name: category.name,
      category_id: category.category_id,
    };
    return this.http.patch<IFilter[]>(`filters/${id}`, body);
  }

  deleteFilter(id: number) {
    return this.http.delete<IFilter[]>(`filters/${id}`);
  }
}
