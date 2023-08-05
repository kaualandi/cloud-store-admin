import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPagedReq } from '../models/utils';
import { IProduct } from '../models/product';
import { ITeam } from '../models/teams';
import { IFilter } from '../models/filters';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}

  getProducts(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', environment.page_size);

    return this.http.get<IPagedReq<IProduct>>('products', params);
  }

  getTeamsSelect() {
    const params = new HttpParams().set('page', 1).set('page_size', 2000);
    return this.http.get<IPagedReq<ITeam>>('teams', params);
  }

  getFiltersAuto(name: string) {
    const params = new HttpParams()
      .set('page', 1)
      .set('page_size', environment.page_size)
      .set('name', name);

    return this.http.get<IPagedReq<IFilter>>('filters', params);
  }

  postProduct(product: IProduct) {
    const body = new HttpParams()
      .set('name', product.name)
      .set('base_price', product.base_price);
    return this.http.post<IProduct[]>(`products/`, body);
  }

  patchProduct(id: number, product: IProduct) {
    const body = new HttpParams();
    return this.http.patch<IProduct[]>(`products/${id}`, body);
  }

  deleteProduct(id: number) {
    return this.http.delete<IProduct[]>(`products/${id}`);
  }
}
