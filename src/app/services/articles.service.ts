import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPagedReq } from '../models/utils';
import { IArticle } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpService) {}

  getArticles(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', environment.page_size);

    return this.http.get<IPagedReq<IArticle>>('articles', params);
  }

  postArticle(article: IArticle) {
    const body = {
      image: article.image,
    };

    return this.http.post<IArticle[]>(`articles/`, body);
  }

  patchArticle(id: number, article: IArticle) {
    const body = {
      image: article.image,
    };
    return this.http.patch<IArticle[]>(`articles/${id}`, body);
  }

  deleteArticle(id: number) {
    return this.http.delete<IArticle[]>(`articles/${id}`);
  }
}
