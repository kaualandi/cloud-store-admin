import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagedReq } from '../models/utils';
import { HttpService } from './http.service';
import { IBanner } from '../models/banner';

@Injectable({
  providedIn: 'root',
})
export class BannersService {
  constructor(private http: HttpService) {}

  getBanners(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', environment.page_size);

    return this.http.get<IPagedReq<IBanner>>('banners', params);
  }

  postBanner(banner: IBanner) {
    const body = {
      image: banner.image,
    };

    return this.http.post<IBanner[]>(`banners/`, body);
  }

  patchBanner(id: number, banner: IBanner) {
    const body = {
      image: banner.image,
    };
    return this.http.patch<IBanner[]>(`banners/${id}`, body);
  }

  deleteBanner(id: number) {
    return this.http.delete<IBanner[]>(`banners/${id}`);
  }
}
