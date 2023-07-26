import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPagedReq } from '../models/utils';
import { ICategory } from '../models/categorys';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpService) {}

  getCategorys(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', environment.page_size);

    return this.http.get<IPagedReq<ICategory>>('categorys', params);
  }

  postCategory(category: ICategory) {
    const body = {
      name: category.name,
    };

    return this.http.post<ICategory[]>(`categorys/`, body);
  }

  patchCategory(id: number, category: ICategory) {
    const body = {
      name: category.name,
    };
    return this.http.patch<ICategory[]>(`categorys/${id}`, body);
  }

  deleteCategory(id: number) {
    return this.http.delete<ICategory[]>(`categorys/${id}`);
  }
}
